import styled from 'styled-components'

export const RegisterWrap = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 60px auto 40px;
  input {
    outline: none;
  }
  .css-1nmdiq5-menu {
    position: absolute;
    z-index: 3;
  }

  .value-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    label {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .price {
      width: 300px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .map {
      width: 100%;
      height: 400px;
      border: 1px solid;
    }
    .valid {
      font-size: 12px;
      color: red;
      margin-top: 3px;
    }
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .value-box-side {
      width: 260px;

      label {
        margin-bottom: 5px;
      }
      .price {
        display: flex;
        align-items: center;
        gap: 3px;
      }
      &:nth-last-child(1) {
        margin-top: 12px;
      }
      .valid {
        font-size: 12px;
        color: red;
        margin-top: 3px;
      }
    }
  }
  .value-box-flex {
    display: flex;
    align-items: center;
    gap: 10px;

    input {
      width: 20px;
      height: 20px;
    }
  }

  .value-img-container {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .top {
      display: flex;
      align-items: center;
      gap: 20px;
      label {
        font-size: 18px;
        cursor: pointer;
      }
      button {
        padding: 5px 15px;
        background-color: rgb(52, 152, 219);
        border: none;
        outline: none;
        border-radius: 8px;
        color: #fff;
      }
    }
    .img-layout {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 400px;
      margin-top: 5px;
      .thumnail {
        width: 320px;
        height: 320px;
        border: 1px solid #aaa;
        box-sizing: border-box;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 25px;
        }
      }
      .img-list {
        width: 50%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .sub-img {
          border: 1px solid #aaa;
          border-radius: 20px;
          width: 170px;
          height: 170px;
          margin-top: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
      }
    }
    p {
      font-size: 14px;
      margin: 10px 0 100px;
    }
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: 100px;
      height: 40px;
      border-radius: 8px;
      background-color: rgb(52, 152, 219);
      color: #fff;
      border: none;
    }
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
`
