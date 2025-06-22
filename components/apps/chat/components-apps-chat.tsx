'use client';

import IconMenu from '@/components/icon/icon-menu';
import IconMessage from '@/components/icon/icon-message';
import IconMoodSmile from '@/components/icon/icon-mood-smile';
import IconSearch from '@/components/icon/icon-search';
import IconSend from '@/components/icon/icon-send';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState, AppDispatch } from '@/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '@/src/hooks/useChat';
import { fetchCompanyMembers } from '@/store/MembersSlice';
// import { fetchCompanyMembers } from '@/store/CompanyMembersSlice'; // Corrected import

interface Contact {
    userId: string;
    name: string;
    path: string;
    time: string;
    preview: string;
    active: boolean;
}

interface Message {
    fromUserId: string;
    toUserId: string;
    text: string;
    time: string;
}

interface ChatProps {
    loginUserId: string | string[];
}

const ComponentsAppsChat = () => {
    // Retrieve current_user from cookies
    const userdata = localStorage.getItem('user_data');
    const userDataPars = userdata ? JSON.parse(userdata) : {};
    const userId = String(userDataPars.uid); // Ensure this is a string
    // const userId = typeof loginUserId === 'string' ? loginUserId : loginUserId[0];
    const [selectedUser, setSelectedUser] = useState<Contact | null>(null);
    const { messages, sendMessage } = useChat(userId, selectedUser?.userId || null);
    // console.log('Messages:alll in compo', messages);
    const dispatch = useDispatch<AppDispatch>();
    const { members, loading, error } = useSelector((state: IRootState) => state.members); // Corrected state slice
    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [contactList, setContactList] = useState<Contact[]>([]);
    const [loginUser, setLoginUser] = useState<Contact | null>(null);

    // Fetch user data from localStorage and dispatch API call
    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            console.error('No user data found in localStorage');
            return;
        }

        try {
            const user = JSON.parse(userData);
            if (!user?.uid) {
                console.error('Invalid user data: missing uid');
                return;
            }

            // Set login user for display
            setLoginUser({
                userId: user.uid.toString(),
                name: user.name || 'Unknown User',
                path: user.profile || 'user-profile.jpeg',
                time: 'Now',
                preview: 'Online',
                active: true,
            });
            console.log('Fetching members for companyId:', user.business_id);
            dispatch(fetchCompanyMembers({ companyId: user.business_id, page: 1 }));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }, [dispatch]);

    // Map members to contact list format and filter out login user
    useEffect(() => {
        if (members.members.length > 0) {
            const newContactList: Contact[] = members.members.map((member) => ({
                userId: member.uid.toString(),
                name: member.name,
                path: member.profile || 'user-profile.jpeg',
                time: 'Now', // Placeholder
                preview: member.email, // Placeholder
                active: member.status,
            }));

            // Filter out the logged-in user
            const contactFilterList = newContactList.filter((item) => item.userId !== userId);
            setContactList(contactFilterList);
        }
    }, [members, userId]);

    // Scroll to bottom of chat
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

    // Derive filtered items based on search
    const filteredItems = contactList.filter((d) => d.name.toLowerCase().includes(searchUser.toLowerCase()));

    return (
        <div>
            <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`panel absolute z-10 hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block ${isShowChatMenu ? '!block' : ''}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-none">
                                <img src={`https://drupal-shift-swap.asdev.tech/sites/default/files/${loginUser?.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
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
                        {loading && <p className="text-gray-600">Loading members...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        <PerfectScrollbar className="chat-users relative h-full min-h-[100px] space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(100vh_-_357px)]">
                            {filteredItems.length > 0
                                ? filteredItems.map((person) => (
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
                                                          <img src={`https://drupal-shift-swap.asdev.tech/sites/default/files/${person.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
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
                                  ))
                                : !loading && <p className="text-gray-600">No members found.</p>}
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
                                <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]">{/* SVG content omitted for brevity */}</div>
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
                                        <img
                                            src={`https://drupal-shift-swap.asdev.tech/sites/default/files/${selectedUser.path}`}
                                            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                                            alt=""
                                        />
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
                                                        <img
                                                            src={`https://drupal-shift-swap.asdev.tech/sites/default/files/${
                                                                message.fromUserId === selectedUser.userId ? selectedUser.path : loginUser?.path
                                                            }`}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            alt=""
                                                        />
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
                                                        </div>

                                                        <div className={`text-xs text-white-dark flex flex-col ${message.fromUserId === selectedUser.userId ? '' : 'ltr:text-right rtl:text-left'}`}>
                                                            <span>{message.time}</span>
                                                            {/* ✅ Show "Read" status only for messages sent by the logged-in user */}
                                                            {message.fromUserId === userId && (
                                                                <span className={`mt-0.5 ${message.read ? 'text-green-600' : 'text-gray-400'}`}>
                                                                    {message.read ? `Read${message.readAt ? ` at ${message.readAt}` : ''}` : 'Unread'}
                                                                </span>
                                                            )}
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
