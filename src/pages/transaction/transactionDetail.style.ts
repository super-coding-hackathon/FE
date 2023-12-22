import styled from 'styled-components'

interface ProgressStyleProps {
  width: string
}

export const StepDetailWrap = styled.div`
  width: 100%;
  padding-bottom: 80px;
  h2 {
    font-size: 25px;
    font-weight: 800;
  }
  .meta {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    .tip {
      display: flex;
      gap: 15px;
      align-items: center;
      cursor: pointer;
      span {
        font-size: 18px;
        font-weight: 600;
      }
      svg {
        fill: #000;
        width: 18px;
        height: 18px;
      }
    }
    .step {
      font-size: 25px;
      color: #ccc;
      span {
        font-family: 700;
        color: #636363;
      }
    }
  }

  .now-status {
    margin-top: 40px;
    font-size: 26px;
    span {
      font-weight: 700;
      color: #0074d9;
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #ddd;
  }

  .map {
    /* background-color: pink; */
    max-width: 1300px;
    width: 100%;
    height: 500px;
    margin: 80px auto 0;
  }
`

export const ProgressBar = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 12px;
  background-color: rgba(127, 219, 255, 0.5);
  border-radius: 12px;
`

export const Progress = styled.div<ProgressStyleProps>`
  background-color: #0074d9;
  height: 100%;
  width: ${({ width }) => width};
  transition: 1s;
  border-radius: 12px;
`

export const TransactionItem = styled.ul`
  display: flex;
  margin: 40px auto 0;
  justify-content: space-between;
  max-width: 1100px;
  padding-bottom: 40px;
  li {
    display: flex;
    flex-direction: column;
    max-width: 180px;
    width: 100%;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
    }
    .desc {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      img {
        max-width: 180px;
        height: 180px;
        width: 100%;
        border-radius: 50%;
      }
    }
  }
`

export const StepListWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  margin: 40px auto 0;
  li {
    font-size: 18px;
    list-style: disc;
  }
  .active {
    font-size: 24px;
    font-weight: 700;
    color: #0074d9;
  }
  .complete {
    color: red;
    text-decoration: line-through;
  }
`

export const FileContainer = styled.ul`
  max-width: 1100px;
  width: 100%;
  margin: 30px auto 0;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  .watch-pdf {
    width: 130px;
    padding: 10px 0;
    outline: none;
    border: none;
    background-color: #0074d9;
    color: #fff;
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
  }
  li {
    display: flex;
    gap: 40px;
    .title {
    }
    span {
    }
  }
  .viewer {
    justify-content: center;
    .react-pdf__Page__textContent,
    .textLayer {
      display: none;
    }
    .react-pdf__Page__annotations,
    .annotationLayer {
      display: none;
    }
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 100px;
    button {
      margin-top: 50px;
      background-color: #0074d9;
      color: #fff;
      font-size: 20px;
      border: none;
      padding: 10px 25px;
      border-radius: 8px;
      cursor: pointer;
    }
  }
`

export const ChatRoomWrap = styled.div`
  display: flex;
  justify-content: end;
  .enter {
    background-color: #90cc4b;
    color: #fff;
    font-size: 18px;
    border: none;
    width: 67px;
    height: 67px;
    border-radius: 50%;
    cursor: pointer;
  }

  .chatList-container {
    height: 600px;
    width: 400px;
    position: absolute;
    top: 200px;
    padding-top: 10px;
    .header {
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      background-color: #f3f3f7;
      border-radius: 12px 12px 0 0;
      .opponent {
        font-size: 20px;
        font-weight: 700;
      }
      svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .chat-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 560px;
      .list {
        padding-top: 10px;
        background-color: #bacee0;
        display: flex;
        flex-direction: column;
        gap: 3px;
        height: 520px;
        border-radius: 0 0 12px 12px;

        .client {
          display: flex;
          justify-content: flex-end;
          margin-right: 3px;
          span {
            background-color: #ffeb33;
            padding: 5px 7px;
            border-radius: 6px;
          }
        }
        .server {
          display: flex;
          position: relative;
          left: 3px;

          span {
            background-color: #fff;
            padding: 5px 7px;
            border-radius: 6px;
          }
        }
      }
      .send-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        .send-layout {
          border: 1px solid #ccc;
          border-radius: 12px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          overflow: hidden;
          padding: 0 7px;
          input {
            padding: 3px 5px;
            border: none;
            outline: none;
            width: 100%;
          }
          svg {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
`
