// hooks/useSocket.ts
'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  transport: string;
}

export default function useSocket(): UseSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (!socket) {
      const socketInstance = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000',
        {
          withCredentials: true,
          transports: ['websocket']
        }
      );

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        setIsConnected(true);
        setTransport(socketInstance.io.engine.transport.name);
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        setTransport('N/A');
      });

      socketInstance.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  return { socket, isConnected, transport };
}