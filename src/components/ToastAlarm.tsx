import Toast from 'react-bootstrap/Toast'

type Props = {
  onClose: () => void
  show: boolean
  message: string
  variant: string
}

const ToastAlarm = ({ onClose, show, message, variant }:Props) => {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={3000}
      autohide
      style={{ position: 'absolute', bottom: 20, right: 20 }}
      bg={variant}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">알림</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default ToastAlarm
