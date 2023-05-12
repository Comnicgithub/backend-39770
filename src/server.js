import server from "./app.js"
import { Server } from "socket.io"

const PORT = process.env.PORT || 8080
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)

let contador = 0

socket_server.on(       //on sirve para escuchar los mensajes que llegan (en este caso del cliente)
    'connection',       //identificador del mensaje a escuchar (el primero siempre connection)
    socket => {         //callback que se va a ejecutar apenas se conecta un cliente
        //console.log(socket)
        console.log(`client ${socket.client.id} connected`)
        socket.on(
            'primer_conexion',
            data=> {
                console.log(data.name)
                contador++
                socket_server.emit(
                    'contador',
                    { contador }
                )
            }
        )
    }
)


// Chatroom

let numUsers = 0;

socket_server.on('connection', (socket) => {
    let addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
        
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // // echo globally that this client has left
            // socket.broadcast.emit('user left', {
            //     username: socket.username,
            //     numUsers: numUsers
            // });
        }
    });
});
