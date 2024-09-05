import { Socket } from 'socket.io-client';

export interface SocketSchema {
  connection?: Socket;
}
