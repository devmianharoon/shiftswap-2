'use client';

import IconMenu from '@/components/icon/icon-menu';
import IconMessage from '@/components/icon/icon-message';
import IconMoodSmile from '@/components/icon/icon-mood-smile';
import IconSearch from '@/components/icon/icon-search';
import IconSend from '@/components/icon/icon-send';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '@/src/hooks/useChat'; // Relative import

interface Contact {
    userId: string;
    name: string;
    path: string;
    time: string;
    preview: string;
    active: boolean;
}

const contactList: Contact[] = [
    // Same as provided, but without messages array
    { userId: '1', name: 'Nia Hillyer', path: 'profile-16.jpeg', time: '2:09 PM', preview: 'How do you do?', active: true },
    { userId: '2', name: 'Sean Freeman', path: 'profile-1.jpeg', time: '12:09 PM', preview: 'I was wondering...', active: false },
    { userId: '3', name: 'Alma Clarke', path: 'profile-2.jpeg', time: '1:44 PM', preview: 'I’ve forgotten how it felt before', active: true },
    { userId: '4', name: 'Alan Green', path: 'profile-3.jpeg', time: '2:06 PM', preview: 'But we’re probably gonna need a new carpet.', active: true },
    { userId: '5', name: 'Shaun Park', path: 'profile-4.jpeg', time: '2:05 PM', preview: 'It’s not that bad...', active: false },
    { userId: '6', name: 'Roxanne', path: 'profile-5.jpeg', time: '2:00 PM', preview: 'Wasup for the third time like is you bling bitch', active: false },
    { userId: '7', name: 'Ernest Reeves', path: 'profile-6.jpeg', time: '2:09 PM', preview: 'Wasup for the third time like is you bling bitch', active: true },
    { userId: '8', name: 'Laurie Fox', path: 'profile-7.jpeg', time: '12:09 PM', preview: 'Wasup for the third time like is you bling bitch', active: true },
    { userId: '9', name: 'Xavier', path: 'profile-8.jpeg', time: '4:09 PM', preview: 'Wasup for the third time like is you bling bitch', active: false },
    { userId: '10', name: 'Susan Phillips', path: 'profile-9.jpeg', time: '9:00 PM', preview: 'Wasup for the third time like is you bling bitch', active: true },
    { userId: '11', name: 'Dale Butler', path: 'profile-10.jpeg', time: '5:09 PM', preview: 'Wasup for the third time like is you bling bitch', active: false },
    { userId: '12', name: 'Grace Roberts', path: 'user-profile.jpeg', time: '8:01 PM', preview: 'Wasup for the third time like is you bling bitch', active: true },
];
interface Message {
    fromUserId: string;
    toUserId: string;
    text: string;
    time: string;
}

interface ChatProps {
    loginUserId: string | string[];
}

const ComponentsAppsChat = ({ loginUserId }: ChatProps) => {
    const userId = typeof loginUserId === 'string' ? loginUserId : loginUserId[0];
    const [selectedUser, setSelectedUser] = useState<Contact | null>(null);
    const { messages, sendMessage } = useChat(userId, selectedUser?.userId || null);
    const loginUser = contactList.find((item) => item.userId == loginUserId);
    const contactFilterList = contactList.filter((item) => item.userId != loginUser?.userId);
    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [filteredItems, setFilteredItems] = useState<Contact[]>(contactFilterList);
    console.log('loginUserId:', loginUserId);

    useEffect(() => {
        setFilteredItems(contactFilterList.filter((d) => d.name.toLowerCase().includes(searchUser.toLowerCase())));
    }, [searchUser]);

    const scrollToBottom = () => {
        if (isShowUserChat) {
            setTimeout(() => {
                const element = document.querySelector('.chat-conversation-box');
                if (element) {
                    element.scrollTop = element.scrollHeight;
                }
            }, 0);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isShowUserChat]);

    const selectUser = (user: Contact) => {
        setSelectedUser(user);
        setIsShowUserChat(true);
        setIsShowChatMenu(false);
    };

    const sendMessageHandler = () => {
        if (textMessage.trim() && selectedUser) {
            sendMessage(selectedUser.userId, textMessage);
            setTextMessage('');
        }
    };

    const sendMessageHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessageHandler();
        }
    };

    return (
        <div>
            <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`panel absolute z-10 hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block ${isShowChatMenu ? '!block' : ''}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-none">
                                <img src={`/assets/images/${loginUser?.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
                            </div>
                            <div className="mx-3">
                                <p className="mb-1 font-semibold">{loginUser?.name}</p>
                                <p className="text-xs text-white-dark">{loginUser?.preview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                        <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                            <IconSearch />
                        </div>
                    </div>
                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                    <div className="!mt-0">
                        <PerfectScrollbar className="chat-users relative h-full min-h-[100px] space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(100vh_-_357px)]">
                            {filteredItems.map((person) => (
                                <div key={person.userId}>
                                    <button
                                        type="button"
                                        className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${
                                            selectedUser && selectedUser.userId === person.userId ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''
                                        }`}
                                        onClick={() => selectUser(person)}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <img src={`/assets/images/${person.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
                                                    {person.active && (
                                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                            <div className="h-4 w-4 rounded-full bg-success"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mx-3 ltr:text-left rtl:text-right">
                                                    <p className="mb-1 font-semibold">{person.name}</p>
                                                    <p className="max-w-[185px] truncate text-xs text-white-dark">{person.preview}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="whitespace-nowrap text-xs font-semibold">
                                            <p>{person.time}</p>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </PerfectScrollbar>
                    </div>
                </div>
                <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
                <div className="panel flex-1 p-0">
                    {!isShowUserChat && (
                        <div className="relative flex h-full items-center justify-center p-4">
                            <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="absolute top-4 hover:text-primary ltr:left-4 rtl:right-4 xl:hidden">
                                <IconMenu />
                            </button>
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]">{/* SVG content unchanged */}</div>
                                <p className="mx-auto flex max-w-[190px] justify-center rounded-md bg-white-dark/20 p-2 font-semibold">
                                    <IconMessage className="ltr:mr-2 rtl:ml-2" />
                                    Click User To Chat
                                </p>
                            </div>
                        </div>
                    )}
                    {isShowUserChat && selectedUser ? (
                        <div className="relative h-full">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <button type="button" className="hover:text-primary xl:hidden" onClick={() => setIsShowChatMenu(!isShowChatMenu)}>
                                        <IconMenu />
                                    </button>
                                    <div className="relative flex-none">
                                        <img src={`/assets/images/${selectedUser.path}`} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" alt="" />
                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                            <div className="h-4 w-4 rounded-full bg-success"></div>
                                        </div>
                                    </div>
                                    <div className="mx-3">
                                        <p className="font-semibold">{selectedUser.name}</p>
                                        <p className="text-xs text-white-dark">{selectedUser.active ? 'Active now' : 'Last seen at ' + selectedUser.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                            <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
                                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                                    <div className="m-6 mt-0 block">
                                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                                            <span className="relative top-2 bg-white px-3 dark:bg-black">Today</span>
                                        </h4>
                                    </div>
                                    {messages.length ? (
                                        messages.map((message: any, index: number) => (
                                            <div key={index}>
                                                <div className={`flex items-start gap-3 ${message.fromUserId === selectedUser.userId ? 'justify-start' : 'justify-end'}`}>
                                                    <div className={`flex-none ${message.fromUserId === selectedUser.userId ? '' : 'order-2'}`}>
                                                        {message.fromUserId === selectedUser.userId ? (
                                                            <img src={`/assets/images/${selectedUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                        ) : (
                                                            <img src={`/assets/images/${loginUser?.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
                                                                    message.fromUserId === selectedUser.userId
                                                                        ? 'ltr:rounded-bl-none rtl:rounded-br-none'
                                                                        : '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                                                }`}
                                                            >
                                                                {message.text}
                                                            </div>
                                                            <div className={`${message.fromUserId === selectedUser.userId ? '' : 'hidden'}`}>
                                                                <IconMoodSmile className="hover:text-primary" />
                                                            </div>
                                                        </div>
                                                        <div className={`text-xs text-white-dark ${message.fromUserId === selectedUser.userId ? '' : 'ltr:text-right rtl:text-left'}`}>
                                                            {message.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No messages yet</p>
                                    )}
                                </div>
                            </PerfectScrollbar>
                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <div className="w-full items-center space-x-3 rtl:space-x-reverse sm:flex">
                                    <div className="relative flex-1">
                                        <input
                                            className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2 focus:outline-none"
                                            placeholder="Type a message"
                                            value={textMessage}
                                            onChange={(e) => setTextMessage(e.target.value)}
                                            onKeyUp={sendMessageHandle}
                                        />
                                        <button type="button" className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-4 rtl:left-4" onClick={sendMessageHandler}>
                                            <IconSend />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentsAppsChat;
