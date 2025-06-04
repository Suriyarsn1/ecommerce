import { useState, useContext } from "react";
import { UtilityContext } from "../context/menuContext";
import axios from 'axios';


function UploadCollectionlist() {
   const [imagePreview, setImagePreview] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionFor, setCollectionFor] = useState('');
  const [collectionImgUrl, setCollectionImgUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const { menu } = useContext(UtilityContext);
  console.log(collectionImgUrl)

  // Handle form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    // Prepare form data for API
    const formData = new FormData();
    formData.append('collectionFor', collectionFor);
    formData.append('collectionName', collectionName);
    if (collectionImgUrl) {
      formData.append('file', collectionImgUrl); 
    }

    try {
      // Send POST request to upload collection
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/collection/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setUploadStatus(response.data.message || "Upload successful!");
      setCollectionName('');
      setCollectionFor('');
      setCollectionImgUrl(null);
    } catch (err) {
      setUploadStatus('Failed to Save: ' + (err.response?.data?.message || err.message));
    }
  };
  //Preparing imgae and preview 
  const handleImage=(e)=>{
     const file=e.target.files[0]
     setCollectionImgUrl(file)
     if(file)
     {
       const imgPreview=URL.createObjectURL(file)
        setImagePreview(imgPreview)
     }else
     {
      setImagePreview(null)
     }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10 animate-fade-in-up transition-all">
        <h1 className="text-2xl font-bold text-center mb-6">Shopping Card</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Collection Name input */}
          <div>
            <label htmlFor="collectionName" className="block mb-1 font-medium">Collection Name:</label>
            <input
              id="collectionName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              required
            />
          </div>

          {/* Collection For dropdown */}
          <div>
            <label htmlFor="collectionFor" className="block mb-1 font-medium">Collection For:</label>
            <select
              id="collectionFor"
              value={collectionFor}
              onChange={(e) => setCollectionFor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select</option>
              {menu.filter(item => item.menuCat === "Categeroy 2").map((item, idx) => (
                <option key={idx} value={item._id}>{item.menuTitle}</option>
              ))}
            </select>
          </div>

          {/* Collection Image upload */}
          <div>
            <label htmlFor="collectionImgUrl" className="block mb-1 font-medium">Collection Image:</label>
            <input
              id="collectionImgUrl"
              type="file"
              onChange={(e) => handleImage(e)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <div>
              {imagePreview&&(<img 
              className="mb-2 w-full h-40 object-cover rounded"
              src={imagePreview}></img>)}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
            type="submit"
          >
            Upload
          </button>

          {uploadStatus && (
            <p className={`text-center mt-2 ${uploadStatus.includes("Success") ? "text-green-600" : "text-blue-600"}`}>
              {uploadStatus}
            </p>
          )}
        </form>

        <a className="block mt-6 text-blue-600 underline text-center" href="/admin/collectionlist">
          Go to Admin Page
        </a>
      </div>
      {/* Animation style for fade-in-up */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

export default UploadCollectionlist;
