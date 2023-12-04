## **주제** : 부동산 거래 포털

---

**필수 기능** :

1. 문서 업로드 / 다운로드
2. 업로드한 문서를 타인이 보고 agree / confirm
3. 전체 프로세스의 진행도

## 서비스 소개

---

집을 사고, 팔거나 혹은 전세 계약을 하는 과정은 생각보다 복잡하므로, 필요한 서류의 양식을 지정해 한 곳에서 서류들을 공유하며 진행 과정을 투명하게 볼 수 있는 **부동산 C2C 거래 플랫폼**

## 주요 기능 및 문제 해결

---

- 매물 등록

  - 등록 같은 경우에 많은 입력 폼이 있어 사용자가 지루함을 느끼거나, 어디까지 진행되었는지 알 수가 없으므로 `UX 향상`을 기대하고 step을 나눠서 구현
    ![image](https://github.com/super-coding-hackathon/FE/assets/105590167/1153a66f-0216-4d4c-90bc-d362afa93a00)



  ```jsx
  const stepPage: { [key: number]: JSX.Element } = {
    1: (
      <StepOne
        handle={handle}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
        openPostCode={openPostCode}
        setOpenPostCode={setOpenPostCode}
      />
    ),
    2: <StepTwo handle={handle} formData={formData} setFormData={setFormData} step={step} setStep={setStep} />,
  }

  return <S.RegisterWrap>{stepPage[step]}</S.RegisterWrap>
  ```

  - 다음 버튼을 누르면 `유효성 검사`를 일괄적으로 마치고 다음 단계로 진행 또는 에러 메시지 나타냄
  - `주소`와 `지도`는 Daum API, Kakao Map을 이용해 구현
  - 이미지는 한 번에 최대 5장까지 선택할 수 있으며, 첫 번째는 썸네일로, 나머지들은 이미지 리스트로 구현

    - 사용자가 용량이 큰 이미지를 올릴 경우, 통신속도, S3의 비용 및 추후 데이터를 불러올 때 렌더링의 속도를 위해 `이미지 최적화`를 진행(**리팩토링**)

    ```jsx
    const resizeImage = async (files: File[]) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        const compressedImageList: File[] = []

        for (const file of files) {
          const compressedBlob = await imageCompression(file, options)

          // Blob 객체를 File 객체로 반환
          const compressedFile = new File([compressedBlob], file.name)
          compressedImageList.push(compressedFile)
        }
        // 압축된 이미지 리턴
        return compressedImageList
      } catch (error) {
        alert('이미지 압축 중 오류가 발생했습니다. 다시 시도해 주세요.')
      }
    }
    ```

    - 파일 리스트들의 차이<br>
      **이미지 최적화 전(파일 크기)** <br>
      ![image-1](https://github.com/super-coding-hackathon/FE/assets/105590167/cca410b9-6552-4730-8d93-d9ff45e98b7d)<br>

      ![image-2](https://github.com/super-coding-hackathon/FE/assets/105590167/a724c25a-3426-4cc5-a38a-01b3c04766b0)<br>

    - 큰 용량의 파일의 차이(**약 85.4% 압축**) <br>
      용량이 작은 파일들은 차이가 나지 않지만, 용량이 큰 이미지 같은 경우에 많은 차이 발생 <br>
      **최적화 전,후(큰 용량의 파일)** <br>
      ![image-3](https://github.com/super-coding-hackathon/FE/assets/105590167/03cc9718-aba5-4b30-bd03-d32e8bac743f)

      약 4.03MB → 약 602.52KB로 압축(**약 85.4%**)
    - 통신 속도의 차이(**약 26.65% 향상**) <br>
      **최적화 전(네트워크 속도)** <br>
      ![image-4](https://github.com/super-coding-hackathon/FE/assets/105590167/44f34797-8a84-4395-a0ed-a9d46064934c) <br>
 
      **최적화 후(네트워크 속도)** <br>
      ![image-5](https://github.com/super-coding-hackathon/FE/assets/105590167/43e76241-e3b0-4189-9f2e-d6f0cd5e41ac) <br>

      통신 속도 또한 **약 26.65%** 향상

- 마이페이지

  - 구매, 판매, 등록 현황들과 회원의 정보를 한눈에 볼 수 있게 좋은 `UX와 UI`를 고려해 구현 <br>
    ![image-6](https://github.com/super-coding-hackathon/FE/assets/105590167/46a65b9a-7000-4675-b164-e1623a07e56f)

  - 거래 상태의 종류가 많다 보니 사용자에게 정확한 정보 전달을 위해 모달을 이용한 `툴 팁` 구현
  - 거래가 중점인 서비스이다 보니 거래 과정이 보다 자세하게 사용자에게 보여야 한다고 판단해 기존의 아코디언 방식의 UI에서 페이지로 수정(**리팩토링**)
    - 기존의 구매 및 판매 현황 (아코디언) <br>
      ![image-7](https://github.com/super-coding-hackathon/FE/assets/105590167/7428dbe2-0529-4a4c-b639-6c4de050c789)

    - 수정 후 구매 및 판매 현황 (페이지) <br>
      ![image-8](https://github.com/super-coding-hackathon/FE/assets/105590167/2991c334-e15f-4de6-8edf-d69a582ecd79) <br>
      ![image-9](https://github.com/super-coding-hackathon/FE/assets/105590167/3c79f4b8-1d18-4e5e-8823-e6df14ea18de)

  - 미리 지정된 양식을 지원해 주기 때문에 어떠한 양식인지 모를 사용자를 고려해 `PDF Viewer`를 추가해 사용자가 PDF 파일을 미리 볼 수 있게 지원(**리팩토링**)
  - 구매자와 판매자를 위해 `실시간 채팅` 구현(**리팩토링 중**)
  - 기존에는 거래 상태별로 JSX 부분에서 조건부로 렌더링, 하지만 코드의 `가독성 및 유지보수`가 용이하지 않아 status와 roll을 매개변수로 받는 함수로 따로 빼 JSX를 return 하는 코드로 수정(**리팩토링**)S

    ```jsx
    const statusUi = (step: string, roll: string) => {
      const value = `${roll}-${step}`
      switch (value) {
        case `buy-거래신청`:
          return <p>판매자가 문서를 보내줄 때 까지 기다려주세요.</p>
        case `sold-거래신청`:
          return (
            <>
              <li>
                <div className="title">파일업로드</div>
                <File setSelectedDocument={setSelectedDocument} />
              </li>

              <li>
                <div className="title">PDF 뷰어</div>
                <input type="file" accept=".pdf" onChange={handleDocumentChange} />
              </li>

              <button className="watch-pdf" onClick={() => setOpenViewer(!openViewer)}>
                {openViewer ? 'PDF 닫기' : 'PDF 미리보기'}
              </button>

              <li className="viewer">
                {pdfDocument && openViewer && (
                  <Document file={pdfDocument}>
                    <Page width={1000} height={500} scale={pageScale} pageNumber={pageNum} />
                  </Document>
                )}
              </li>
            </>
          )
        case `buy-거래승인`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.sellerContractFile && (
                  <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>
                <div className="title">파일업로드</div>
                <File setSelectedDocument={setSelectedDocument} />
              </li>
            </>
          )
        case `sold-거래승인`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                <span>아직 구매자가 파일을 안올렸습니다.</span>
              </li>
            </>
          )
        case `sold-계약검토`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.buyerContractFile && (
                  <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>
              <li>계약서를 확인 후 문제가 없다면 계좌번호를 입력해주세요.</li>
              <li>
                <div className="title">계좌번호 </div>
                <input
                  type="text"
                  placeholder="계좌를 입력해주세요."
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                />
              </li>
            </>
          )
        case `buy-계약검토`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.sellerContractFile && (
                  <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>
                <div className="title">계좌번호 </div>
                <span>판매자가 계좌번호를 등록하지 않았습니다. 기다려주세요.</span>
              </li>
            </>
          )

        case `buy-이체대기`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.sellerContractFile && (
                  <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>
                <div>계좌 번호 : {data.accountNumber}</div>
                <span>좌측의 계좌번호에 송금 한 후에 완료 버튼을 눌러주세요.</span>
              </li>
            </>
          )
        case `sold-이체대기`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.buyerContractFile && (
                  <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>
              <li>판매자가 아직 송금하지 않았습니다. 잠시 기다려주세요.</li>
            </>
          )
        case `buy-이체검토`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.sellerContractFile && (
                  <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>
              <li>
                <div className="title">계좌번호 : {data.accountNumber} </div>
              </li>
              <li>아직 구매자가 송금확인을 안했습니다. 잠시 기다려주세요.</li>
            </>
          )
        case `sold-이체검토`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.buyerContractFile && (
                  <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>입금이 확인되었다면 완료를 눌러주세요.</li>
            </>
          )
        case `buy-거래완료`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.sellerContractFile && (
                  <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>
                <div className="title">계좌번호 : {data.accountNumber} </div>
              </li>

              <li>거래가 완료되었습니다.</li>
            </>
          )
        case `sold-거래완료`:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
                {data.buyerContractFile && (
                  <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                    계약서 다운로드
                  </a>
                )}
              </li>

              <li>거래가 완료되었습니다.</li>
            </>
          )
        default:
          return (
            <>
              <li>
                <div className="title">파일 다운로드</div>
              </li>

              <li>
                <div className="title">파일업로드</div>
              </li>
              <li>
                <div className="title">계좌번호 </div>
              </li>
            </>
          )
      }
    }

    // JSX 부분
    return <S.FileContainer>{roll && data && statusUi(data.transactionStatus, roll)}</S.FileContainer>
    ```

## 기술적 의사 결정

---

1. **React-Query**
   1. **클라이언트의 데이터**와 **서버로부터 받은 데이터**를 **확실히 분류**하기 위해
   2. 기존의 상태관리 라이브러리들은 **서버의 데이터를 관리하기엔 적합하지 않다고 판단**. (서버의 데이터는 수정이 되었지만, 클라이언트에는 미반영)
2. **TypeScript**
   1. 동적 타입인 JS에서 정적 타입인 TS로 **마이그레이션**을 위해
   2. 코드의 가독성이 낮아지는 **옵셔널체이닝을 지양**하므로 확실한 분기 처리를 위해
   3. 에러를 런타임 이전에 잡아 개발 **생산성 향상**을 위해
3. **axios**
   1. **fetch**는 JSON으로 따로 변환을 해줘야 하고 브라우저 호환성이 axios보다 떨어짐
   2. **ajax**는 jQuery와 사용해야 호환성 보장 및 promise 기반이 아니므로 데이터 핸들링이 어렵다고 판단
   3. URL, token을 **중복으로 사용**하는 것을 방지하고자 axois를 **인스턴스화**하기 위해
4. **browser-image-compression**

   1. **이미지 최적화**를 위해
   2. react-image-file-resizer와 비교를 해본 결과 browser-image-compression이 사용도가 더 높아 정보가 많을 것이라고 판단 <br>

      ![image-10](https://github.com/super-coding-hackathon/FE/assets/105590167/782d5fa1-da9e-42ec-9b8e-db1209fd4c5e)


5. **socket.io**
   1. 실시간 통신을 위해서와 Web Socket보다 **추가적인 기능**(네임스페이스, 룸,다양한 전송 방식 등)이 많은 Web Socket 기반인 [socket.io](http://socket.io) 선택
6. **styled-components**
   1. 프로젝트가 크지 않은 소규모 프로젝트라고 판단해 **빠르게 테스트**하기 위해
   2. 3일이라는 적은 시간 안에 프로젝트를 완성해야 하므로 가장 익숙한 styled-components 선택
7. **react-pdf**
   1. PDF 파일 미리보기 기능을 위해 도입
