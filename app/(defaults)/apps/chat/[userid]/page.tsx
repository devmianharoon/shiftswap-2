'use client';
import ComponentsAppsChat from '@/components/apps/chat/components-apps-chat';

import { useParams } from 'next/navigation';
import React from 'react';

const Chat = () => {
  const params = useParams();
  const chatId = params.userid; // or params['id']
  return <ComponentsAppsChat loginUserId={chatId} />;
};

export default Chat;
