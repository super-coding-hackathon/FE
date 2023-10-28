import ProgressBar from 'react-bootstrap/ProgressBar'

const Progress = () => {
  const step = 2

  return (
    <ProgressBar>
      {step >= 1 && <ProgressBar animated striped variant="success" now={100 / 7} key={1} label={'시작'} />}
      {step >= 2 && <ProgressBar animated striped variant="warning" now={100 / 7} key={1} label={'신청'} />}
      {step >= 3 && <ProgressBar animated striped variant="danger" now={100 / 7} key={1} label={'3단계'} />}
      {step >= 4 && <ProgressBar animated striped variant="info" now={100 / 7} key={1} label={'4단계'} />}
      {step >= 5 && <ProgressBar animated striped variant="primary" now={100 / 7} key={1} label={'5단계'} />}
      {step >= 6 && <ProgressBar animated striped variant="secondary" now={100 / 7} key={1} label={'6단계'} />}
      {step >= 7 && <ProgressBar animated striped variant="success" now={100 / 7} key={1} label={'7단계'} />}
    </ProgressBar>
  )
}

export default Progress
