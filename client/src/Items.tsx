import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Clean up the object URL when it changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (previewUrl) URL.revokeObjectURL(previewUrl) // revoke old preview before creating new one

    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!image) return

    const formData = new FormData()
    formData.append("image", image)
    axios.post('http://localhost:3000/api/products/addProducts',formData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
   
   
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className='w-full border p-2 rounded-md outline-none'
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-2 max-w-xs rounded-md border"
          />
        )}

        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default App