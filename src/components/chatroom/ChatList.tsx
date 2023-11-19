import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../hooks/useSocket'
// import { io } from 'socket.io-client'
// import { useSocket } from './useSocket'

interface SocketType {
  room: string
  msg: string
  messageType: string
}

const ChatList = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { socketResponse, sendData } = useSocket('2')

  const [messages, setMessages] = useState<SocketType[]>([])
  console.log('messages ----', messages)

  // console.log(messages)
  const [message, setMessage] = useState<SocketType>({
    room: '',
    msg: '',
    messageType: 'CLIENT',
  })

  // hook
  useEffect(() => {
    setMessages([...messages, socketResponse])
  }, [socketResponse])

  console.log(message)

  // hook
  const sendMessage = () => {
    if (inputRef?.current?.value) {
      sendData({
        msg: inputRef?.current?.value,
      })
    }
  }
  // let room = '2'
  // const socket = io(`http://13.209.89.233:8088/`, {
  //   // query: `room=${room}`
  //   query: { room: room },
  //   reconnection: false,
  // })

  // useEffect(() => {
  //   socket.on('read_message', (msg: SocketType) => {
  //     console.log(msg)
  //     console.log('읽어왔어요')
  //     // setMessages(msg)
  //     // setMessages((prevMessages) => [...prevMessages, msg])
  //     setMessages((prevMessages) => [...prevMessages, msg])
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  // const sendMessage = () => {
  //   if (message.msg.trim() !== '') {
  //     console.log('message ::', message)
  //     socket?.emit('send_message', message)
  //     console.log('보냇음')
  //   }
  // }

  const onChangeInputHandler = () => {
    if (inputRef.current) {
      setMessage({ ...message, msg: inputRef.current.value })
    }
  }

  // console.log(socket)
  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.msg}</li>
        ))}
      </ul>
      <input ref={inputRef} type="text" value={message.msg} onChange={onChangeInputHandler} />
      <button onClick={sendMessage}>전송</button>
    </div>
  )
}

export default ChatList
