import React, { useRef, useState } from "react";
import { RiFileImageLine } from "react-icons/ri";

const StepTwo = ({
  handle,
  formData,
  step,
  setStep,
  openPostCode,
  setOpenPostCode,
  setFormData,
}) => {
  const [errors, setErrors] = useState({});
  const [imgList, setImgList] = useState([]);
  console.log(imgList);

  const imageRef = useRef();

  const onClickImageUpload = () => {
    imageRef.current.click();
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    if (files.length > 5) {
      alert("사진은 최대 5개입니다.");
    } else {
      for (let i = 0; i < files.length; i++) {
        newImages.push(URL.createObjectURL(files[i]));
      }
      setImgList(newImages);
      setFormData({
        ...formData,
        thumbnailImage: newImages[0],
        imageFiles: newImages.slice(1),
      });
    }
  };

  const validate = () => {
    let errors = {};

    if (step === 2 && formData.squareFeet === null) {
      errors.squareFeet = "평수는 1이상으로 입력해주세요.";
    }
    if (step === 2 && formData.floor === null) {
      errors.floor = "층수는 1이상으로 입력해주세요.";
    }
    if (step === 2 && formData.maintenanceFee === null) {
      errors.maintenanceFee = "관리비는 1이상으로 입력해주세요.";
    }

    return errors;
  };

  const thumnailLayout = () => {
    if (formData.thumbnailImage.length !== 0) {
      return <img src={formData.thumbnailImage} alt="thumnail" />;
    }
  };

  const imgListLayout = () => {
    if (formData.imageFiles.length === 0) {
      return (
        <>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
        </>
      );
    } else {
      return formData.imageFiles.map((image, index) => (
        <div key={index} className="sub-img">
          <img src={image} alt={`이미지 ${index + 1}`} />
        </div>
      ));
    }
  };

  const clickButton = (state) => {
    if (state === "next") {
      const errors = validate();
      if (Object.keys(errors).length === 0) {
        // navigate('/')
        console.log("등록 완료");
        // setStep(1);
      } else {
        setErrors(errors);
      }
    } else {
      // navigate('/')
      // alert("메인으로");
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="flex-container">
        <div className="value-box-side">
          <label htmlFor="squareFeet">크기</label>
          <div className="price">
            <input
              id="squareFeet"
              type="number"
              min="1"
              max="99999999"
              name="squareFeet"
              onChange={handle.onChangeNumber}
            />
            <span>평</span>
          </div>
          {errors.squareFeet && (
            <div className="valid">{errors.squareFeet}</div>
          )}
        </div>

        <div className="value-box-side">
          <label htmlFor="floor">층 수</label>
          <div className="price">
            <input
              id="floor"
              type="number"
              min="1"
              max="99999999"
              name="floor"
              onChange={handle.onChangeNumber}
            />
            <span>층</span>
          </div>
          {errors.floor && <div className="valid">{errors.floor}</div>}
        </div>

        <div className="value-box-side">
          <label htmlFor="maintenanceFee">관리비</label>
          <div className="price">
            <input
              id="maintenanceFee"
              type="number"
              min="1"
              max="99999999"
              name="maintenanceFee"
              onChange={handle.onChangeNumber}
            />
            <span>만원</span>
          </div>
          {errors.maintenanceFee && (
            <div className="valid">{errors.maintenanceFee}</div>
          )}
        </div>
      </div>

      <div className="value-box-flex">
        <label htmlFor="isParking">주차</label>
        <input
          type="checkbox"
          name="isParking"
          onChange={handle.onChangeCheck}
        />
      </div>

      <div className="value-img-container">
        <div className="top">
          <label htmlFor="image">사진</label>
          <button onClick={onClickImageUpload}>이미지 업로드</button>
        </div>
        <input
          type="file"
          multiple
          id="image"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={handleImagesChange}
        />
        <div className="img-layout">
          <div className="thumnail">{thumnailLayout()}</div>
          <div className="img-list">{imgListLayout()}</div>
        </div>
        <p>
          여러 사진을 한번에 최대 5장 업로드 할 수 있으며, 첫번째 사진은
          썸네일로 사용됩니다.
        </p>
      </div>

      <div className="footer">
        <button onClick={() => clickButton("prev")}>뒤로</button>
        <span>{step} / 2 Page</span>
        <button onClick={() => clickButton("next")}>등록</button>
      </div>
    </>
  );
};

export default StepTwo;
