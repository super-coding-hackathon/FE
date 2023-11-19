import { useCallback, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketResponse {
  messageType: string
  room: string
  msg: string
}

interface UseSocketProps {
  socketResponse: SocketResponse
  sendData: (payload: { msg: string }) => void
}

export const useSocket = (room: string): UseSocketProps => {
  const [socket, setSocket] = useState<Socket | undefined>()
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    messageType: '',
    room: '',
    msg: '',
  })

  const sendData = useCallback(
    (payload: { msg: string }) => {
      socket?.emit('send_message', {
        room: room,
        msg: payload.msg,
        messageType: 'CLIENT',
      })
    },
    [socket, room],
  )

  useEffect(() => {
    const s = io('ws://13.209.89.233:8088', {
      reconnection: false,
      // query: `room=${room}`,
      query: { room },
    }) as Socket

    setSocket(s)

    s.on('read_message', (res) => {
      setSocketResponse({
        room: res.room,
        msg: res.msg,
        messageType: res.messageType,
      })
    })

    return () => {
      s.disconnect()
    }
  }, [room])

  return { socketResponse, sendData }
}
