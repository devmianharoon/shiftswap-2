import { co } from '@fullcalendar/core/internal-common';
import { useEffect, useState, useRef } from 'react';

interface BackendMessage {
    sender: string;
    recipient: string;
    encrypted_content: string;
    timestamp: number;
}

interface DisplayMessage {
    fromUserId: string;
    toUserId: string;
    text: string;
    time: string;
}

export const useChat = (userId: string, selectedRecipientId: string | null) => {
    const [messages, setMessages] = useState<BackendMessage[]>([]);
    const [decryptedMessages, setDecryptedMessages] = useState<{ [key: string]: string }>({});
    const socketRef = useRef<WebSocket | null>(null);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

    // Derive AES-GCM key from shared secret
    useEffect(() => {
        const initCrypto = async () => {
            const sharedSecret = process.env.NEXT_PUBLIC_CHAT_SHARED_SECRET; // Replace with secure shared passphrase
            const salt = new TextEncoder().encode('chat-salt'); // Fixed salt for consistency
            const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(sharedSecret), { name: 'PBKDF2' }, false, ['deriveKey']);
            const key = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt,
                    iterations: 100000,
                    hash: 'SHA-256',
                },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                true,
                ['encrypt', 'decrypt'],
            );
            setCryptoKey(key);
            console.log('Derived AES-GCM key');
        };
        initCrypto();
    }, []);

    // Initialize WebSocket
    useEffect(() => {
        if (!userId) return;

        socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${userId}`);
        const socket = socketRef.current;

        socket.onopen = () => console.log('WebSocket connected');
        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
            if (data.action === 'messages') {
                setMessages(data.data);
            } else {
                setMessages((prev) => {
                    if (!prev.some((m) => m.timestamp === data.timestamp)) {
                        return [...prev, data];
                    }
                    return prev;
                });
            }
        };
        socket.onerror = (error) => console.error('WebSocket error:', error);
        socket.onclose = () => console.log('WebSocket closed');

        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            } else {
                console.log('WebSocket was not open; skipping close.');
            }
        };
    }, [userId]);

    // Fetch messages when recipient changes
    useEffect(() => {
        if (selectedRecipientId && socketRef.current) {
            socketRef.current.send(
                JSON.stringify({
                    action: 'get_messages',
                    sender: userId,
                    recipient: selectedRecipientId,
                }),
            );
        }
    }, [selectedRecipientId, userId]);

    // Encrypt and send message
    const sendMessage = async (recipientId: string, content: string) => {
        if (!cryptoKey || !socketRef.current) return;

        try {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encoder = new TextEncoder();
            const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, encoder.encode(content));
            const encryptedArray = Array.from(new Uint8Array(encrypted));
            const ivArray = Array.from(iv);

            const message = {
                action: 'message',
                sender: userId,
                recipient: recipientId,
                encrypted_content: JSON.stringify({ iv: ivArray, encrypted: encryptedArray }),
                timestamp: Date.now(),
            };

            console.log('Sending:', message);
            socketRef.current.send(JSON.stringify(message));
        } catch (error) {
            console.error('Encryption error:', error);
        }
    };

    // Decrypt messages
    useEffect(() => {
        const decryptAll = async () => {
            if (!cryptoKey) return;
            const decrypted: { [key: string]: string } = {};
            for (const msg of messages) {
                try {
                    const { iv, encrypted } = JSON.parse(msg.encrypted_content);
                    const ivArray = new Uint8Array(iv);
                    const encryptedArray = new Uint8Array(encrypted);
                    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivArray }, cryptoKey, encryptedArray);
                    const decoder = new TextDecoder();
                    decrypted[msg.timestamp] = decoder.decode(decryptedData);
                } catch (error) {
                    console.error('Decryption error:', msg, error);
                    decrypted[msg.timestamp] = '[Decryption failed]';
                }
            }
            setDecryptedMessages(decrypted);
        };
        decryptAll();
    }, [messages, cryptoKey]);

    // Format messages for ComponentsAppsChat
    const formattedMessages = messages.map((msg) => ({
        fromUserId: msg.sender,
        toUserId: msg.recipient,
        text: decryptedMessages[msg.timestamp] || 'Decrypting...',
        time: new Date(msg.timestamp).toLocaleTimeString(),
    }));

    return { messages: formattedMessages, sendMessage };
};
