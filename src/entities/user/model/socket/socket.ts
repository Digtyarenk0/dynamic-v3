import { io } from 'socket.io-client';

export const InitiateSocket = (token: string) =>
  io('', {
    transports: ['websocket', 'polling'],
    auth: {
      authorizationdynamic: `Bearer ${token}`,
    },
  });

export const ApiSocket = { InitiateSocket };
