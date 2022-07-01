import 'dotenv/config'
import { Server } from 'socket.io'

const NODE_PORT = Number(process.env.NODE_PORT || 3000)

const io = new Server(NODE_PORT, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

console.log(`Starting on ${NODE_PORT}`)

// ไปเอา random มาจาก blockchain
// Reroll ได้

const correctNumber = ~~(Math.random() * 100)
const listResult = []

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log('correctNumber ', correctNumber)

  // นับ Client
  // console.log(io.engine.clientsCount)

  // Relay messages to other clients
  if (io.engine.clientsCount <= 2) {
    socket.onAny((event, _number) => {
      if (event === 'play') {
        const number = parseInt(_number, 10)
        if (correctNumber === number) {
          listResult.push({ no: number, result: 'Correct' })
        } else if (correctNumber > number) {
          listResult.push({ no: number, result: 'Too low' })
        } else if (correctNumber < number) {
          listResult.push({ no: number, result: 'Too High' })
        }
        io.emit('result', listResult)
      }
      // socket.broadcast.emit("receive_message", ...args)
      // ส่งหาทุกคนยกเว้น connected client ที่เรียกมา
      // socket.broadcast.emit("receive_message", "messages")
    })
  } else {
    console.log('exceed player limit')
  }

  // ส่งหาเฉพาะห้อง !!!
  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  // });
})
