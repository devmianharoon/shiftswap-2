'use client';
import ComponentsAppsChat from '@/components/apps/chat/components-apps-chat';
import Cookies from 'js-cookie';
import React from 'react';

const Chat = () => {
    // Retrieve current_user from cookies
    const currentUser = Cookies.get('current_user');
    // Parse the JSON string or set default if not found
    const userId = currentUser ? JSON.parse(currentUser).uid : '21`1';

    return <ComponentsAppsChat loginUserId={userId} />;
};

export default Chat;
