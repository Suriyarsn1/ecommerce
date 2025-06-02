import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminUpdateCollectionList() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [updateStatus, setUpdateStatus] = useState('')
  const [collectionImgUrl, setCollectionImgUrl] = useState(null)
 const [previewImg, setPreviewImg] = useState('')
  const [updateCollection, setUpdateCollection] = useState({
    collectionTypeName: '',
    collectionFor: '',
  })
console.log(updateCollection)
  // Fetch existing collection details when component mounts or ID changes
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/collection/getlist/${id}`)
        console.log(res.data)
        setUpdateCollection({
          collectionTypeName: res.data.collectionTypeName || '',
          collectionFor: res.data.collectionFor || '',
        })
        setPreviewImg(res.data.collectionImgUrl)
      } catch (err) {
        console.error("Fetching Failed:", err)
      }
    }
    fetchCollection()
  }, [id])

  // Handle text input changes for the form
  function handleChange(e) {
    const { name, value } = e.target
    setUpdateCollection({ ...updateCollection, [name]: value })
  }

  // Handle file input change and set preview
  function handleFileChange(e) {
    setCollectionImgUrl(e.target.files[0])
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  // Handle form submission to update the collection
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateStatus('Updating...')
    const formData = new FormData()
    // Append the updated fields to formData
    formData.append('collectionTypeName', updateCollection.collectionTypeName)
    formData.append('collectionFor', updateCollection.collectionFor)
    if (collectionImgUrl) formData.append('collectionImgUrl', collectionImgUrl)
    try {
      // Send PUT request to update the collection
      await axios.put(`http://localhost:5000/api/collection/update/${id}`, formData)
      setUpdateStatus('Update Details Successfully')
      setTimeout(() => navigate('/admin/collectionlist'), 1200)
    } catch (err) {
      setUpdateStatus('Failed to Save')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      {/* Main form card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-center mb-6">Update Collection</h1>
        {/* Update form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Collection Name input */}
          <div>
            <label htmlFor="collectionTypeName" className="block mb-1 font-medium">Collection Name:</label>
            <input
              type="text"
              id="collectionTypeName"
              name="collectionTypeName"
              value={updateCollection.collectionTypeName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none font-thin"
              required
            />
          </div>
          {/* Collection For dropdown */}
          <div>
            <label htmlFor="collectionFor" className="block mb-1 font-medium">Collection For:</label>
            <select
              id="collectionFor"
              name="collectionFor"
              value={updateCollection.collectionFor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="Kids">Kids</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          {/* Image preview and file input */}
          <div>
            <label className="block mb-1 font-medium">Collection Image:</label>
            {/* Show preview if available */}
            {previewImg && (
              <img
                src={previewImg}
                alt="Collection Preview"
                className="mb-2 w-full h-40 object-cover rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Submit button and status */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
            type="submit"
          >
            {updateStatus === 'Updating...' ? 'Updating...' : 'Update'}
          </button>
          {/* Status message */}
          {updateStatus && (
            <p className={`text-center mt-2 ${updateStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
              {updateStatus}
            </p>
          )}
        </form>
        {/* Link to admin page */}
        <a className="block mt-6 text-blue-600 underline text-center" href="/admin">
          Go to Admin Page
        </a>
      </div>
      {/* Animation style for fade-in-up */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  )
}

export default AdminUpdateCollectionList;
