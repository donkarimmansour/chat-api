const io = require('socket.io')(8080, {
    cors: {
        origin: '*',
        // methods: ['GET', 'POST']
    }
})

let onlineUser = [];

const addUser = (userId, socketId, userInfo) => {

    const checkUser = onlineUser.some(u => u.userId === userId);

    if (!checkUser) {
        onlineUser.push({ userId, socketId, userInfo });
    }
}

const findFriend = (id) => {
    return onlineUser.find(u => u.userId === id);
}

const userLogout = (userId) => {
    onlineUser = onlineUser.filter(u => u.userId !== userId)
}

const userRemove = (socketId) => {
    onlineUser = onlineUser.filter(u => u.socketId !== socketId);
}


io.on('connection', (socket) => {


    console.log('user is connected.....1');


    socket.on('addUser', (userInfo) => {

        console.log(userInfo.id);

        addUser(userInfo.id, socket.id, userInfo);

        //  socket.join("onlineUser")
        
      //  socket.to("adminChat").emit('getUser', onlineUser)
        io.emit('getUser', onlineUser);
        // socket.broadcast.in("onlineUser").emit('new_user_add')

    })


    socket.on('typingMessage', (data) => {

        const user = findFriend(data.reseverId);

        if (user !== undefined) {

            socket.to(user.socketId).emit('typingMessageGet', {
                senderId: data.senderId,
                reseverId: data.reseverId,
                msg: data.msg
            })
        }

    });




    socket.on('sendMessage', (data) => {

        const user = findFriend(data.reseverId);

        if (user !== undefined) {

            socket.to(user.socketId).emit('getMessage', data)
        }
    })


    socket.on('seen', data => {

        const user = findFriend(data.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('seenSuccess', data);
        }
    })





    socket.on('messageSeen', msg => {
        const user = findFriend(msg.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgSeenResponse', msg)
        }
    })



    socket.on('delivaredMessage', msg => {
        const user = findFriend(msg.senderId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('msgDelivaredResponse', msg)
        }

    })


    socket.on('logout', userId => {
        userLogout(userId)
    })

    socket.on('disconnect', () => {
        console.log('user disconnect....');

        //socket.leave("onlineUser")

        userRemove(socket.id);

       // socket.to("adminChat").emit('getUser', onlineUser)
        io.emit('getUser', onlineUser)
    })

})