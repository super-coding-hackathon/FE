import { useState } from 'react'
import * as S from '../../pages/transaction/transactionDetail.style'
import ChatList from './ChatList'

const ChatRoom = () => {
  const [openChat, setOpenChat] = useState<boolean>(false)

  const enterChatRoom = () => {
    setOpenChat(true)
  }
  return (
    <S.ChatRoomWrap>
      {openChat ? (
        <ChatList setOpenChat={setOpenChat} />
      ) : (
        <button className="enter" onClick={enterChatRoom}>
          채팅방
        </button>
      )}
    </S.ChatRoomWrap>
  )
}

export default ChatRoom
