export const baseUrl = 'http://192.168.4.27:3001'
// export const baseUrl = 'http://localhost:3001'
import io from 'socket.io-client'

export const socket = io(baseUrl)

export const socketConnect = () => {
  socket.on('connection', (msg) => {
    console.log('connected')
  })
}

export const socketDisconnect = () => {
  socket.disconnect()
}

export const handleJoinGame = (roomId) => {
  socket.emit('joinGame', roomId)
}

export const createGame = () => {
  socket.emit('newGame', { game: 'gameId' })
}

export const getNumPlayer = (roomId) => {
  socket.emit('getNumPlayer', roomId)
}

export const getHand = (roomId) => {
  socket.emit('getHand', roomId)
}

socket.on('roomId', (id) => {
  setRoomId(id)
})

socket.on('connectToRoom', (msg) => {
  console.log(msg)
})

socket.on('hand', (msg) => {
  setClientId(msg)
  console.log(clientId)
})
