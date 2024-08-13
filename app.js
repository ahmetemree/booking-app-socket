import {Server} from "socket.io"


const io = new  Server({
    cors:{
        origin:"http://localhost:5173",
    },
});
//
let onlineUser =[]

const addUser=(userId,socketId)=>{
    const userExists = onlineUser.find((user)=>user.userId === userId);
    if(!userExists){
        onlineUser.push({userId,socketId})
    }
}

const removeUser=(socketId)=>{
    onlineUser = onlineUser.filter((user)=>user.socketId !==socketId)
}

const getUser = (userId) => {
    console.log(onlineUser);
    let findUser = onlineUser.find((user) => user.userId === userId)
    return findUser;
    
  };

io.on("connection",  (socket)=>{
    
    socket.on("newUser",(userId)=>{
    addUser(userId, socket.id)
    
   });

    socket.on("sendMessage" , ({receiverId,data})=>{
       //console.log(onlineUser);
       const receiver = getUser(receiverId)
    io.to(receiver.socketId).emit("getMessage",data)
   })

    socket.on("disconnect",()=>{
    removeUser(socket.id)
   })
});

io.listen("4000")


//real time son mesajı göster, mesaj gönder butonuna basınca mesaj gönder, chat bugunu çöz cannot read socketId

