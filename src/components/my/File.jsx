import React, { useState } from 'react'

const File = ({ transactionMutate, id, roll, status }) => {
  const [selectedDocument, setSelectedDocument] = useState(null)
  // console.log(transactionMutate)
  console.log(roll)

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.files[0])
  }

  const uploadDocument = () => {
    if (!selectedDocument) return

    const formData = new FormData()
    if (roll === '판매자') {
      formData.append('sellerContractFile', selectedDocument)
    } else if (roll === '구매자') {
      formData.append('buyerContractFile', selectedDocument)
    }

    // if(roll === '판매자'){
    //   if(status ===)
    // } else{
    //   // 구매자 일때
    // }

    let obj = {
      id,
      formData,
    }

    // debugger
    console.log(selectedDocument)
    // console.log(formData)
    transactionMutate(obj)
  }

  return (
    <div>
      <div>
        <h2>파일 업로드</h2>
        <div>
          <input type="file" accept=".doc, .docx" onChange={handleDocumentChange} />
          <button onClick={uploadDocument}>문서 업로드</button>
        </div>
      </div>
    </div>
  )
}

export default File
