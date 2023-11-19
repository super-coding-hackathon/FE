import { FC, useEffect, useRef, useState } from 'react'
import { useSocket } from '../../hooks/useSocket'
import { IoIosSend, IoMdClose } from 'react-icons/io'
import { useParams } from 'react-router-dom'
// import { io } from 'socket.io-client'
// import { useSocket } from './useSocket'

interface SocketType {
  room: string
  msg: string
  messageType: string
}

interface ChatListProps {
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatList: FC<ChatListProps> = ({ setOpenChat }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const room = useParams().transactionId || ''

  // const email = sessionStorage.getItem('email')
  // console.log(email)

  const { socketResponse, sendData } = useSocket(room)

  const [messages, setMessages] = useState<SocketType[]>([])

  const [message, setMessage] = useState<SocketType>({
    room,
    msg: '',
    messageType: 'CLIENT',
  })

  // hook
  useEffect(() => {
    if (socketResponse.msg) {
      setMessages([...messages, socketResponse])
    }
  }, [socketResponse])

  // hook
  const sendMessage = () => {
    if (inputRef?.current?.value) {
      sendData({
        msg: inputRef.current.value,
      })
      setMessage({
        room: '',
        msg: '',
        messageType: 'CLIENT',
      })
      setMessages([...messages, message])
    }
  }

  const onChangeInputHandler = () => {
    if (inputRef.current) {
      setMessage({ ...message, msg: inputRef.current.value })
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage()
  }

  const checkClass = (messageType: string) => {
    if (messageType === 'CLIENT') {
      return 'client'
    } else {
      return 'server'
    }
  }
  return (
    <div className="chatList-container">
      <div className="header">
        <div className="opponent">00님과 채팅방</div>
        <IoMdClose onClick={() => setOpenChat(false)} />
      </div>
      <div className="chat-body">
        <ul className="list">
          {messages.map((msgData, index) => (
            <li key={index} className={checkClass(msgData.messageType)}>
              <span>{msgData.msg}</span>
            </li>
          ))}
        </ul>

        <form className="send-form" onSubmit={submitHandler}>
          <div className="send-layout">
            <input ref={inputRef} value={message.msg} onChange={onChangeInputHandler} />
            <IoIosSend onClick={sendMessage} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatList
