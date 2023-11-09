import styled from 'styled-components'

export const MyPageWrap = styled.div`
  width: 100%;

  .title {
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 30px;
    cursor: pointer;
  }
  .flex-box {
    display: flex;
    margin-top: 50px;
    .userInfo {
      width: 100%;
      max-width: 1200px;
      padding: 30px 40px;
      border: 1px solid #ebebeb;
      border-radius: 1rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      .info-item {
        p {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .info {
          color: rgb(52, 152, 219);
        }
      }
    }
  }
`

export const TabSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
  /* background-color: pink; */
  .tab {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .tab-item {
      font-size: 18px;
      cursor: pointer;
    }
    .active {
      font-size: 20px;
      font-weight: 800;
      cursor: pointer;
    }
  }
`

export const RenderSection = styled.section`
  max-width: 1350px;
  width: 100%;
  height: 100%;
  padding: 0 80px;
  box-sizing: border-box;
  margin: 0 auto;
  /* background-color: pink; */
`

export const History = styled.div`
  margin-top: 42px;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto auto;
  .history-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    h3 {
      font-size: 18px;
      font-weight: 700;
    }
    span {
      color: rgba(34, 34, 34, 0.5);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }
  ul {
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .history-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 250px;
      height: 85px;
      padding-top: 18px;
      cursor: default;
      position: relative;

      &_title {
        font-size: 13px;
        margin-bottom: 10px;
      }
      &_number {
        font-size: 18px;
        font-weight: 700;
        margin-top: 2px;
      }
    }
  }
  .bg-green {
    background-color: #f2f9f6;
  }
  .bg-white {
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .home-list {
    display: flex;
    justify-content: flex-start;
    gap: 25px;
    .home-item {
      padding: 5px;
      .thumb {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      .name {
        font-size: 16px;
        text-align: center;
      }
    }
    span {
      padding: 10px 8px;
      border-radius: 12px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background-color: rgb(52, 152, 219);
        color: #fff;
      }
    }
  }
`

export const PurchaseContainer = styled.div`
  h2 {
    font-size: 30px;
    font-weight: 700;
  }
  .total {
    margin: 12px 0;
    font-size: 14px;
    font-weight: 700;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;
    span {
      color: blue;
    }
  }
`

export const Table = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .none {
    font-size: 18px;
    font-weight: 700;
    margin-top: 15px;
  }
  .table-title {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30px;
    background-color: #b2b6bc;
    color: #fff;
    border-radius: 8px 8px 0 0;
    padding-bottom: 5px;
    &_item {
      width: calc(100% / 6);
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      padding-bottom: 5px;
      font-weight: 700;
      svg {
        margin-left: 10px;
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
    }
  }
  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 0 2px 0;
    background-color: #ecf0f4;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.012);
      border-radius: 8px;
    }
    .imgBox {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 1px solid;
      }
    }

    &_desc {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      width: calc(100% / 6);
      height: 100%;
      border-top: 1px solid #c8c5c5;
    }

    /* &:nth-child(2n + 1) {
      background-color: #8c8f92;
      color: #fff;
    } */
  }
  .pagination {
    /* background-color: pink; */
    display: flex;
    gap: 10px;
    margin-top: 40px;
    .page {
      width: 30px;
      height: 30px;
      background-color: skyblue;
      font-size: 18px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`

export const MyListWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  .none {
    font-size: 18px;
    font-weight: 700;
    margin-top: 15px;
  }
  ul {
    height: 800px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
  }
  li {
    width: 580px;
    /* background-color: pink; */
    display: flex;
    gap: 30px;
    margin-bottom: 10px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.025);
    }
    .thumb {
      width: 240px;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .info-item {
        display: flex;
        align-items: center;
        gap: 30px;
        p {
          font-size: 20px;
          font-weight: 800;
        }
      }
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .page {
      width: 30px;
      height: 30px;
      background-color: skyblue;
      font-size: 18px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`

export const AccordionBody = styled.div`
  background-color: #c3c7cc;
  height: auto;
  width: 100%;
  padding: 20px 0;
  /* display: flex; */
  /* flex-direction: column; */
  .step {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .step-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    p {
      margin-bottom: 5px;
      font-size: 18px;
    }
    .completed {
      text-decoration: line-through;
      color: red;
    }
    .confirm {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
    }
    .agree {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`
