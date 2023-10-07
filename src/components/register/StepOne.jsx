import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import DaumPostCode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const StepOne = ({
  handle,
  formData,
  step,
  setStep,
  openPostCode,
  setOpenPostCode,
}) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const categoryOption = [
    { value: "아파트", label: "아파트", name: "categoryId" },
    { value: "빌라", label: "빌라", name: "categoryId" },
    { value: "원룸", label: "원룸", name: "categoryId" },
  ];

  const transactionTypeOption = [
    { value: "전세", label: "전세", name: "transactionType" },
    { value: "매매", label: "매매", name: "transactionType" },
  ];

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "40px",
      margin: "auto",
      width: "500px",
      height: "400px",
      padding: "0",
      overflow: "hidden",
    },
  };

  // 전세 매매 분류 함수
  const checkTransactionType = () => {
    if (formData.transactionType === "전세") {
      return (
        <div className="value-box">
          <label htmlFor="transactionType">보증금</label>
          <div className="price">
            <input
              id="transactionType"
              type="number"
              min="1"
              max="99999999"
              name="deposit"
              value={formData.deposit}
              onChange={handle.onChangeNumber}
            />
            <span>만원</span>
          </div>
          {errors.deposit && <div className="valid">{errors.deposit}</div>}
        </div>
      );
    } else if (formData.transactionType === "매매") {
      return (
        <div className="value-box">
          <label htmlFor="transactionType">계약금</label>
          <div className="deposit">
            <input
              id="transactionType"
              type="number"
              min="1"
              max="99999999"
              name="deposit"
              value={formData.deposit}
              onChange={handle.onChangeNumber}
            />
            <span>만원</span>
          </div>
          {errors.deposit && <div className="valid">{errors.deposit}</div>}
        </div>
      );
    } else {
      return null;
    }
  };

  const validate = () => {
    let errors = {};

    if (step === 1 && formData.address.length === 0) {
      errors.address = "주소를 입력해주세요.";
    }
    if (step === 1 && formData.detailAddress.length === 0) {
      errors.detailAddress = "상세주소를 입력해주세요.";
    }
    if (step === 1 && formData.categoryId.length === 0) {
      errors.categoryId = "건물 종류를 선택해주세요.";
    }
    if (step === 1 && formData.transactionType.length === 0) {
      errors.transactionType = "전세/매매 둘 중 하나를 선택해주세요.";
    }
    if (
      step === 1 &&
      formData.transactionType.length !== 0 &&
      formData.deposit === null
    ) {
      errors.deposit = "보증금은 최소 1이상으로 입력해주세요.";
    }
    if (step === 1 && formData.name.length === 0) {
      errors.name = "건물의 명칭 또는 이름을 입력해주세요.";
    }
    // if (formData.transactionType.length !== 0 && formData.price === null) {
    //   errors.price = "계약금은 최소 1이상으로 입력해주세요.";
    // }

    return errors;
  };

  const clickButton = (state) => {
    if (state === "next") {
      const errors = validate();
      // console.log(errors);
      if (Object.keys(errors).length === 0) {
        setStep(step + 1);
        // 임시 저장 기능
      } else {
        setErrors(errors);
      }
    } else {
      navigate("/");
      // alert("메인으로");
    }
  };

  return (
    <>
      <div className="value-box">
        <label htmlFor="address">주소</label>
        <input
          type="text"
          id="address"
          name="address"
          onClick={handle.clickPost}
          value={formData.address}
          readOnly
        />
        {errors.address && <div className="valid">{errors.address}</div>}
      </div>

      <div className="value-box">
        <label htmlFor="detailAddress">상세주소</label>
        <input
          type="text"
          name="detailAddress"
          id="detailAddress"
          value={formData.detailAddress}
          onChange={handle.onChangeInput}
        />
        {errors.detailAddress && (
          <div className="valid">{errors.detailAddress}</div>
        )}
      </div>

      <div className="value-box">
        <label htmlFor="name">명칭(이름)</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handle.onChangeInput}
          value={formData.name}
        />
        {errors.name && <div className="valid">{errors.name}</div>}
      </div>

      <div className="value-box">
        <label htmlFor="category">건물 종류</label>
        <Select
          placeholder="건물 종류"
          options={categoryOption}
          value={categoryOption.find(
            (option) => option.value === formData.categoryId
          )}
          onChange={handle.onChangeSelect}
        />

        {errors.categoryId && <div className="valid">{errors.categoryId}</div>}
      </div>

      <div className="value-box">
        <label htmlFor="transactionType">전세/매매</label>
        <Select
          placeholder="전세/매매"
          options={transactionTypeOption}
          value={transactionTypeOption.find(
            (option) => option.value === formData.transactionType
          )}
          onChange={handle.onChangeSelect}
        />
        {errors.transactionType && (
          <div className="valid">{errors.transactionType}</div>
        )}
      </div>

      {checkTransactionType()}

      <div className="value-box">
        <label htmlFor="transactionType">지도</label>
        <div className="map"></div>
      </div>

      <div className="footer">
        <button onClick={() => clickButton("prev")}>뒤로</button>
        <span>{step} / 2 Page</span>
        <button onClick={() => clickButton("next")}>다음</button>
      </div>

      <Modal
        isOpen={openPostCode}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={() => setOpenPostCode(false)}
        shouldCloseOnOverlayClick={true}
      >
        <DaumPostCode
          onComplete={handle.selectAddress}
          autoClose={false}
          height="100%"
        />
      </Modal>
    </>
  );
};

export default StepOne;
