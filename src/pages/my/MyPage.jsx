import React, { useState } from "react";
import * as S from "./my.style";
import UserInfo from "../../components/my/UserInfo";
import Buyer from "../../components/my/Buyer";
import Seller from "../../components/my/Seller";
import Tab from "../../components/my/Tab";

const MyPage = () => {
  const [rendered, setRendered] = useState("회원 정보");

  const render = {
    "회원 정보": <UserInfo />,
    "구매 현황": <Buyer />,
    "판매 현황": <Seller />,
  };

  return (
    <S.MyPageWrap>
      <div className="title">마이페이지</div>
      <div className="flex-box">
        <Tab setRendered={setRendered} rendered={rendered} />
        <S.RenderSection>{render[rendered]}</S.RenderSection>
      </div>
    </S.MyPageWrap>
  );
};

export default MyPage;
