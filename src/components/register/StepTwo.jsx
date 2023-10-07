import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { RiFileImageLine } from "react-icons/ri";
import { CreateHome } from "../../api/home/post";

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
  const [thumnail, setThumnail] = useState(null);

  const imageRef = useRef();

  const onClickImageUpload = () => {
    imageRef.current.click();
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    if (files.length > 5) {
      alert("사진은 최대 5개입니다.");
      return;
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);

        // newImages.push(URL.createObjectURL(fileObject));
        newImages.push(file);
      }
      setFormData({
        ...formData,
        thumbnailImage: newImages[0],
        imageFiles: newImages.slice(1),
      });

      setThumnail(URL.createObjectURL(newImages[0]));
      setImgList(newImages.slice(1).map((image) => URL.createObjectURL(image)));
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
    if (thumnail) {
      return <img src={thumnail} alt="thumnail" />;
    }
  };

  const imgListLayout = () => {
    if (imgList.length === 0) {
      return (
        <>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
          <div className="sub-img"></div>
        </>
      );
    } else {
      return imgList.map((image, index) => (
        <div key={index} className="sub-img">
          <img src={image} alt={`이미지 ${index + 1}`} />
        </div>
      ));
    }
  };

  const { mutate: registerMutate } = useMutation(CreateHome, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (response) => console.log(response),
  });

  const clickButton = (state) => {
    if (state === "next") {
      const errors = validate();
      if (Object.keys(errors).length === 0) {
        // navigate('/')
        // console.log("등록 완료");
        const formDataToSend = new FormData();
        if (formData.categoryId === "아파트") {
          formDataToSend.append("categoryId", 1);
        } else if (formData.categoryId === "빌라") {
          formDataToSend.append("categoryId", 2);
        } else {
          formDataToSend.append("categoryId", 3);
        }
        formDataToSend.append("address", formData.address);
        formDataToSend.append("detailAddress", formData.detailAddress);
        formDataToSend.append("deposit", formData.deposit);
        formDataToSend.append("floor", formData.floor);
        formDataToSend.append("isParking", formData.isParking);
        formDataToSend.append("latitude", formData.latitude);
        formDataToSend.append("longitude", formData.longitude);
        formDataToSend.append("maintenanceFee", formData.maintenanceFee);
        formDataToSend.append("mapId", formData.mapId);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("roadAddress", formData.roadAddress);
        formDataToSend.append("squareFeet", formData.squareFeet);
        formDataToSend.append("thumbnailImage", formData.thumbnailImage);
        formDataToSend.append("transactionType", formData.transactionType);

        formData.imageFiles.forEach((imageFile, index) => {
          formDataToSend.append(`imageFiles[${index}]`, imageFile);
        });

        registerMutate(formDataToSend);
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
              value={formData.squareFeet}
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
              value={formData.floor}
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
              value={formData.maintenanceFee}
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
          checked={formData.isParking}
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
