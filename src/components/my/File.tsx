import { ChangeEvent, FC } from 'react'
import { FileProps } from './type'

const File: FC<FileProps> = ({ setSelectedDocument }) => {
  // const [selectedDocument, setSelectedDocument] = useState<File | null>(null)

  const handleDocumentChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedDocument(event.target.files[0])
    }
  }

  return (
    <div>
      <div>
        {/* <h2>파일 업로드</h2> */}
        <div>
          <input type="file" accept=".doc, .docx" onChange={handleDocumentChange} />
          {/* <button onClick={uploadDocument}>문서 업로드</button> */}
        </div>
      </div>
    </div>
  )
}

export default File
