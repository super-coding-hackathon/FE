import styled from 'styled-components'

export const DetailWrap = styled.div`
  padding: 0 80px 200px;

  .img-container {
    width: 100%;
    /* background-color: pink; */
    display: flex;
    align-items: end;
    gap: 40px;
    .thumb {
      width: 300px;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    .img-list {
      display: flex;
      gap: 15px;
      img {
        width: 230px;
        height: 230px;
        border-radius: 20px;
      }
    }
  }

  .title {
    font-size: 25px;
    font-weight: 700;
    margin: 50px 0 15px;
  }

  .map {
    width: 1000px;
    height: 600px;
    /* background-color: pink; */
    border: 1px solid;
    margin: 0 auto;
  }
`
export const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: skyblue; */
  margin-bottom: 50px;
  .name {
    font-size: 30px;
    font-weight: 700;
  }
  .info-right {
    display: flex;
    align-items: center;
    gap: 30px;
    .user-name {
    }
    .create-at {
    }
  }
`

export const InfoBox = styled.div`
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 70px;
  .info-item {
    width: 48%;
    height: 100%;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      font-size: 20px;
      font-weight: 700;
    }
    span {
      font-size: 18px;
    }
  }
  .post {
    cursor: pointer;
    background-color: #ddd;
    padding: 15px 20px;
  }
`
