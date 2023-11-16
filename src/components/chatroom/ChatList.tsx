import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ChatList = () => {
  // const socket = io(`${process.env.REACT_APP_SOCKET_URL}`)
  const socket = io(`http://13.209.89.233:8088/`)

  const [messages, setMessages] = useState<string[]>([])

  console.log(messages)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    socket.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat message', message)
      setMessage('')
    }
  }

  console.log(socket)
  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>전송</button>
    </div>
  )
}

export default ChatList
