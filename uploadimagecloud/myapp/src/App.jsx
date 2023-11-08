import { useState } from "react"
import axios from 'axios';
function App() {
  const [file,setFile] = useState({})
  const uploadFile = ()=>{
    const formData = new FormData();
    // forma data 2 chez leta hay phla key 2sra value 
    formData.append('file',file)
    const data = axios.post('http://localhost:5000/api/upload',formData)
    .then(res=>console.log("res-->",res))
    .catch(err=> console.log("err--->",err))
    console.log(file);
  
  }
  return (
    <>
      <div>
        <h1>Image Uploader</h1>
        <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Uplaod</button>
      </div>

    </>
  )
}

export default App
