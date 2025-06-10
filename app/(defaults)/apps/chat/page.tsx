'use client';
import ComponentsAppsChat from '@/components/apps/chat/components-apps-chat';

import { useParams } from 'next/navigation';
import React from 'react';

const Chat = () => {
  return <ComponentsAppsChat loginUserId={'1'} />;
};

export default Chat;
