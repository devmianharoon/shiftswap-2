import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { markUserActive } from '@/store/activitySlice';

interface BackendMessage {
  sender: string;
  recipient: string;
  encrypted_content: string;
  timestamp: number;
  read: boolean;
  read_at?: number;
  is_group?: boolean;
  group_id?: string;
  read_by?: string[];
}

interface DisplayMessage {
  fromUserId: string;
  toUserId?: string;
  text: string;
  time: string;
  read: boolean;
  readAt?: string;
}

export const useChat = (userId: string, selectedRecipientId: string | null, selectedGroupId: string | null) => {
  const [messages, setMessages] = useState<BackendMessage[]>([]);
  const [decryptedMessages, setDecryptedMessages] = useState<{ [key: string]: string }>({});
  const socketRef = useRef<WebSocket | null>(null);
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const dispatch = useDispatch();

  // Derive AES-GCM key
  useEffect(() => {
    const initCrypto = async () => {
      const sharedSecret = process.env.NEXT_PUBLIC_CHAT_SHARED_SECRET || 'default_secret';
      const salt = new TextEncoder().encode('chat-salt');
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

    socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/${userId}`);
    const socket = socketRef.current;

    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log('Received:', data);
      if (data.sender) {
        dispatch(markUserActive({ userId: data.sender, timestamp: Date.now() }));
      }
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
  }, [userId, dispatch]);

  // Fetch messages when recipient or group changes
  useEffect(() => {
    if ((selectedRecipientId || selectedGroupId) && socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          action: 'get_messages',
          sender: userId,
          recipient: selectedRecipientId || selectedGroupId,
          is_group: !!selectedGroupId,
          group_id: selectedGroupId,
        }),
      );
    }
  }, [userId, selectedRecipientId, selectedGroupId]);

  // Encrypt and send message
  const sendMessage = async (recipientId: string, content: string, isGroup: boolean) => {
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
        is_group: isGroup,
        group_id: isGroup ? recipientId : null,
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
          decrypted[msg.timestamp.toString()] = decoder.decode(decryptedData);
        } catch (error) {
          console.error('Decryption error:', msg, error);
          decrypted[msg.timestamp.toString()] = '[Decryption failed]';
        }
      }
      setDecryptedMessages(decrypted);
    };
    decryptAll();
  }, [messages, cryptoKey]);

  // Format messages for display
  const formattedMessages = messages.map((msg) => ({
    fromUserId: msg.sender,
    toUserId: msg.recipient,
    text: decryptedMessages[msg.timestamp.toString()] || 'Decrypting...',
    time: new Date(msg.timestamp).toLocaleTimeString(),
    read: msg.is_group ? msg.read_by?.includes(userId) || false : msg.read,
    readAt: msg.read_at ? new Date(msg.read_at).toLocaleTimeString() : undefined,
  }));

  return { messages: formattedMessages, sendMessage };
};
