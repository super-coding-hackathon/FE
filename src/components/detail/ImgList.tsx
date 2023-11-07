import { FC } from 'react'
import { imgFilesType } from './type'

interface ImgListProps {
  imgList: imgFilesType[]
}

const ImgList: FC<ImgListProps> = ({ imgList }) => {
  return (
    <div className="img-list">
      {imgList?.map((el, index) => (
        <img src={el.imageUrl} key={index} alt={`사진 ${index}`} />
      ))}
    </div>
  )
}

export default ImgList
