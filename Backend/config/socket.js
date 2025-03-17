import { Server } from 'socket.io'

export let io;

export function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('User Connected');

        socket.on('disconnect', () => {
            console.log('User Disconnected')
        });
    });
};
