import { FC } from 'react'
import { imgFilesType } from './type'

interface ThumbnailProps {
  thumbnail: imgFilesType[]
}

const Thumbnail: FC<ThumbnailProps> = ({ thumbnail }) => {
  return (
    <div className="thumb">
      {thumbnail?.map((el, index) => (
        <img src={el.imageUrl} key={index} alt="썸네일" />
      ))}
    </div>
  )
}

export default Thumbnail
