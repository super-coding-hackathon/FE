import { ChangeEvent, FC, useState } from 'react'
import { FileProps } from './type'

const File: FC<FileProps> = ({ transactionMutate, id, roll }) => {
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)

  const handleDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedDocument(event.target.files[0])
    }
  }

  const uploadDocument = () => {
    if (!selectedDocument) return

    const formData = new FormData()
    if (roll === '판매자') {
      formData.append('sellerContractFile', selectedDocument)
    } else if (roll === '구매자') {
      formData.append('buyerContractFile', selectedDocument)
    }

    let obj = {
      id,
      formData,
    }
    console.log(obj)
    console.log(selectedDocument)
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
