import { FC } from 'react'
import { InfoItemProps } from './type'

const InfoItem: FC<InfoItemProps> = ({ title, desc }) => {
  const checkUnit = (): string => {
    if (typeof desc === 'number' && title === '층 수') {
      return '층'
    }
    if (typeof desc === 'number' && title === '크기') {
      return '평'
    }
    if (typeof desc === 'number') {
      return '만원'
    }
    return ''
  }

  return (
    <div className="info-item">
      <p>{title} : </p>
      <span>
        {desc}
        {checkUnit()}
      </span>
    </div>
  )
}

export default InfoItem
