const { Server } = require("socket.io")

const io = new Server(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// ไปเอา random มาจาก blockchain
// Reroll ได้

let correctNumber = ~~(Math.random(0,1) * 100)
let listResult = []

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log("correctNumber ",correctNumber)

  // นับ Client
  // console.log(io.engine.clientsCount)

  // Relay messages to other clients
  if (io.engine.clientsCount <= 2) {
    socket.onAny((event, _number) => {
      if (event === 'play') {
        let number = parseInt(_number, 10)
        if (correctNumber === number) {
          listResult.push({no:number,result:"Correct"});
        } else if (correctNumber > number) {
          listResult.push({no:number,result:"Too low"});
        } else if (correctNumber < number) {
          listResult.push({no:number,result:"Too High"});
        }
        io.emit("result",listResult)
      }
      // socket.broadcast.emit("receive_message", ...args)
      // ส่งหาทุกคนยกเว้น connected client ที่เรียกมา
      // socket.broadcast.emit("receive_message", "messages")

    })
  } else {
    console.log("exceed player limit")
  }

  // ส่งหาเฉพาะห้อง !!!
  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  // });
  
})
