import { FC, useEffect, useState } from 'react'
import * as S from '../../pages/transaction/transactionDetail.style'

interface ProgressBarProps {
  step: number
}

const ProgressBar: FC<ProgressBarProps> = ({ step }) => {
  const [progressValue, setProgressValue] = useState<number>(1)
  const getProgressWidth = (step: number): number => {
    return Math.floor((step / 6) * 100)
  }

  useEffect(() => {
    switch (step) {
      case 1:
        setProgressValue(getProgressWidth(1))
        break
      case 2:
        setProgressValue(getProgressWidth(2))
        break
      case 3:
        setProgressValue(getProgressWidth(3))
        break
      case 4:
        setProgressValue(getProgressWidth(4))
        break
      case 5:
        setProgressValue(getProgressWidth(5))
        break
      case 6:
        setProgressValue(getProgressWidth(6))
        break
      default:
        break
    }
  }, [step])

  return (
    <S.ProgressBar>
      <S.Progress width={`${progressValue}%`} />
    </S.ProgressBar>
  )
}

export default ProgressBar
