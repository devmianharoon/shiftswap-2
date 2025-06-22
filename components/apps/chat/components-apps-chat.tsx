'use client';

import IconMenu from '@/components/icon/icon-menu';
import IconMessage from '@/components/icon/icon-message';
import IconSearch from '@/components/icon/icon-search';
import IconSend from '@/components/icon/icon-send';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState, AppDispatch } from '@/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '@/src/hooks/useChat';
import { fetchCompanyMembers } from '@/store/MembersSlice';
import { fetchUserGroups } from '@/store/UserGroupSlice';

interface Contact {
  userId: string;
  name: string;
  path: string;
  time: string;
  preview: string;
  active: boolean;
}

interface Group {
  id: string;
  title: string;
  group_type: string;
  mapped_data: Array<{ id: string; name: string }>;
}

interface Message {
  fromUserId: string;
  toUserId: string;
  text: string;
  time: string;
  read: boolean;
  readAt?: string;
}

const ComponentsAppsChat = () => {
  const userdata = localStorage.getItem('user_data');
  const userDataPars = userdata ? JSON.parse(userdata) : {};
  const userId = String(userDataPars.uid);
  const companyId = userDataPars.business_id;

  const [selectedTab, setSelectedTab] = useState<'users' | 'groups'>('users');
  const [selectedUser, setSelectedUser] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { messages, sendMessage } = useChat(userId, selectedUser?.userId || null, selectedGroup?.id || null);
  const dispatch = useDispatch<AppDispatch>();
  const { members, loading: membersLoading, error: membersError } = useSelector((state: IRootState) => state.members);
  const { groups, loading: groupsLoading, error: groupsError } = useSelector((state: IRootState) => state.userGroups);
  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [isShowChat, setIsShowChat] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [loginUser, setLoginUser] = useState<Contact | null>(null);

  useEffect(() => {
    if (!userdata) {
      console.error('No user data found in localStorage');
      return;
    }

    try {
      const user = JSON.parse(userdata);
      if (!user?.uid) {
        console.error('Invalid user data: missing uid');
        return;
      }

      setLoginUser({
        userId: user.uid.toString(),
        name: user.name || 'Unknown User',
        path: user.profile || 'user-profile.jpeg',
        time: 'Now',
        preview: 'Online',
        active: true,
      });

      dispatch(fetchCompanyMembers({ companyId: user.business_id, page: 1 }));
      dispatch(fetchUserGroups({ companyId: user.business_id, userId: user.uid.toString() }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [dispatch, userdata]);

  useEffect(() => {
    if (members.members.length > 0) {
      const newContactList: Contact[] = members.members.map((member) => ({
        userId: member.uid.toString(),
        name: member.name || 'Unknown',
        path: member.profile || 'user-profile.jpeg',
        time: 'Now',
        preview: member.email || 'No email',
        active: member.status,
      }));

      const contactFilterList = newContactList.filter((item) => item.userId !== userId);
      setContactList(contactFilterList);
    }
  }, [members, userId]);

  useEffect(() => {
    if (groups.length > 0) {
      setGroupList(groups);
    }
  }, [groups]);

  const scrollToBottom = () => {
    if (isShowChat) {
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
  }, [messages, isShowChat]);

  const selectUser = (user: Contact) => {
    setSelectedUser(user);
    setSelectedGroup(null);
    setIsShowChat(true);
    setIsShowChatMenu(false);
  };

  const selectGroup = (group: Group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
    setIsShowChat(true);
    setIsShowChatMenu(false);
  };

  const sendMessageHandler = () => {
    if (textMessage.trim() && (selectedUser || selectedGroup)) {
      if (selectedUser) {
        sendMessage(selectedUser.userId, textMessage, false);
      } else if (selectedGroup) {
        sendMessage(selectedGroup.id, textMessage, true);
      }
      setTextMessage('');
    }
  };

  const sendMessageHandle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const filteredItems = contactList.filter((d: any) => d.name.toLowerCase().includes(searchUser.toLowerCase()));
  const filteredGroups = groupList.filter((d: any) => d.title.toLowerCase().includes(searchUser.toLowerCase()));

  return (
    <div>
      <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
        <div className={`panel absolute z-10 hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block ${isShowChatMenu ? '!block' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-none">
                <img src={`${process.env.NEXT_PUBLIC_BE_URL}/sites/default/files/${loginUser?.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
              </div>
              <div className="mx-3">
                <p className="mb-1 font-semibold">{loginUser?.name}</p>
                <p className="text-xs text-white-dark">{loginUser?.preview}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button type="button" className={`px-4 py-2 rounded-md ${selectedTab === 'users' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSelectedTab('users')}>
              Users
            </button>
            <button type="button" className={`px-4 py-2 rounded-md ${selectedTab === 'groups' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSelectedTab('groups')}>
              Groups
            </button>
          </div>
          <div className="relative">
            <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
              <IconSearch />
            </div>
          </div>
          <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
          <div className="!mt-0">
            {selectedTab === 'users' ? (
              <>
                {membersLoading && <p className="text-gray-600">Loading members...</p>}
                {membersError && <p className="text-red-500">{membersError}</p>}
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
                                  <img src={`${process.env.NEXT_PUBLIC_BE_URL}/sites/default/files/${person.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
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
                    : !membersLoading && <p className="text-gray-600">No members found.</p>}
                </PerfectScrollbar>
              </>
            ) : (
              <>
                {groupsLoading && <p className="text-gray-600">Loading groups...</p>}
                {groupsError && <p className="text-red-500">{groupsError}</p>}
                <PerfectScrollbar className="chat-groups relative h-full min-h-[100px] space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(100vh_-_357px)]">
                  {filteredGroups.length > 0
                    ? filteredGroups.map((group: any) => (
                        <div key={group.id}>
                          <button
                            type="button"
                            className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${
                              selectedGroup && selectedGroup.id === group.id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''
                            }`}
                            onClick={() => selectGroup(group)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <div className="relative flex-shrink-0">
                                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary dark:text-white text-lg font-semibold">
                                    {group.title.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="mx-3 ltr:text-left rtl:text-right">
                                  <p className="mb-1 font-semibold">{group.title}</p>
                                  <p className="max-w-[185px] truncate text-xs text-white-dark">{group.mapped_data.map((m: any) => m.name).join(', ')}</p>
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))
                    : !groupsLoading && <p className="text-gray-600">No groups found.</p>}
                </PerfectScrollbar>
              </>
            )}
          </div>
        </div>
        <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
        <div className="panel flex-1 p-0">
          {!isShowChat && (
            <div className="relative flex h-full items-center justify-center p-4">
              <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="absolute top-4 hover:text-primary ltr:left-4 rtl:right-4 xl:hidden">
                <IconMenu />
              </button>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]"></div>
                <p className="mx-auto flex max-w-[190px] justify-center rounded-md bg-white-dark/20 p-2 font-semibold">
                  <IconMessage className="ltr:mr-2 rtl:ml-2" />
                  Select a User or Group to Chat
                </p>
              </div>
            </div>
          )}
          {isShowChat && (selectedUser || selectedGroup) ? (
            <div className="relative h-full">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button type="button" className="hover:text-primary xl:hidden" onClick={() => setIsShowChatMenu(!isShowChatMenu)}>
                    <IconMenu />
                  </button>
                  <div className="relative flex-none">
                    {selectedUser ? (
                      <>
                        <img src={`${process.env.NEXT_PUBLIC_BE_URL}/sites/default/files/${selectedUser.path}`} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" alt="" />
                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                          <div className="h-4 w-4 rounded-full bg-success"></div>
                        </div>
                      </>
                    ) : (
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary dark:text-white text-lg font-semibold">
                        {selectedGroup?.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="mx-3">
                    <p className="font-semibold">{selectedUser ? selectedUser.name : selectedGroup?.title}</p>
                    <p className="text-xs text-white-dark">{selectedUser ? (selectedUser.active ? 'Active now' : `Last seen at ${selectedUser.time}`) : 'Group Chat'}</p>
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
                        <div className={`flex items-start gap-3 ${message.fromUserId === userId ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex-none ${message.fromUserId === userId ? 'order-2' : ''}`}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_BE_URL}/sites/default/files/${message.fromUserId === userId ? loginUser?.path : selectedUser?.path || 'user-profile.jpeg'}`}
                              className="h-10 w-10 rounded-full object-cover"
                              alt=""
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
                                  message.fromUserId === userId ? 'bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none' : 'ltr:rounded-bl-none rtl:rounded-br-none'
                                }`}
                              >
                                {message.text}
                              </div>
                            </div>
                            <div className={`text-xs text-white-dark flex flex-col ${message.fromUserId === userId ? 'ltr:text-right rtl:text-left' : ''}`}>
                              <span>{message.time}</span>
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
                    <p className="text-center text-gray-600">No messages yet</p>
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
