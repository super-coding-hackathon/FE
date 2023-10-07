import React from "react";
import * as S from "../../pages/my/my.style";

const Tab = ({ setRendered, rendered }) => {
  const tabs = [
    { label: "회원 정보" },
    { label: "구매 현황" },
    { label: "판매 현황" },
  ];

  const clickTab = (e) => {
    setRendered(e.target.innerHTML);
  };
  return (
    <S.TabSection>
      <div className="tab">
        {tabs.map((el, index) => (
          <div className="tab-item" key={index} onClick={clickTab}>
            {el.label}
          </div>
        ))}
      </div>
    </S.TabSection>
  );
};

export default Tab;
