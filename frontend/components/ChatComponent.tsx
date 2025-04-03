// components/ChatComponent.tsx
'use client';

import { useSocket } from '@/hooks/useSocket';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma'; // Your Prisma client instance

export default function ChatComponent() {
  const socket = useSocket();
  const [messages, setMessages] = useState<{ id: string, content: string }[]>([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('newMessage', async (message: { content: string }) => {
      // Save to database using Prisma
      const savedMessage = await prisma.message.create({
        data: {
          content: message.content,
        },
      });

      setMessages(prev => [...prev, savedMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', { content: 'Hello from client!' });
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        {messages.map(msg => (
          <div key={msg.id}>{msg.content}</div>
        ))}
      </div>
    </div>
  );
}