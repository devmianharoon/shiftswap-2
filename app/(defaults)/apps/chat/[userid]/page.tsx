'use client';
import ComponentsAppsChat from '@/components/apps/chat/components-apps-chat';
import { useParams } from 'next/navigation';
import React from 'react';

const Chat = () => {
  const params = useParams();
  const chatId = params?.userid as string | undefined;

  if (!chatId) {
    return <div>Error: No chat ID provided.</div>; // or handle gracefully
  }

  return <ComponentsAppsChat loginUserId={chatId} />;
};

export default Chat;