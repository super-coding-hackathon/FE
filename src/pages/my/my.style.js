import styled from "styled-components";

export const MyPageWrap = styled.div`
  width: 100%;
  /* display: flex; */
  .title {
    font-size: 24px;
    font-family: 800;
  }
  .flex-box {
    display: flex;
    .userInfo {
      padding: 0 80px;
      box-sizing: border-box;
      p {
        font-size: 20px;
      }
      .info {
        margin: 8px 0;
        color: rgb(52, 152, 219);
      }
    }
  }
`;

export const TabSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  /* background-color: pink; */
  .tab {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .tab-item {
      font-size: 18px;
      cursor: pointer;
    }
  }
`;

export const RenderSection = styled.section`
  /* background-color: skyblue; */
  width: 100%;
  height: 100%;
`;
