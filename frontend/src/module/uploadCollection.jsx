import { useState,useContext } from "react";
import { UtilityContext } from "../context/menuContext";
import axios from 'axios';

function UploadCollectionlist() {
  const [collectionName, setcollectionName] = useState('');
  const [collectionFor, setcollectionFor] = useState('');
  const [collectionImgUrl, setcollectionImgUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const {menu}=useContext(UtilityContext)
  

  // Handle form submission 
  const handlesubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');

    // Prepare form data for API
    const formData = new FormData();
    formData.append('collectionFor', collectionFor);
    formData.append('collectionName', collectionName);
    formData.append('collectionImgUrl', collectionImgUrl);

    try {
      // Send POST request to upload collection
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/collection/upload`, formData);
      setUploadStatus(response.data.message || "Upload successful!");
      setcollectionName('')
      setcollectionFor('');
      setcollectionImgUrl('')
      setcollectionImgUrl(null);
    } catch (err) {
      console.log(err);
      setUploadStatus('Failed to Save',err);
    }
  };

  return (

    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10 animate-fade-in-up transition-all">
    
        <h1 className="text-2xl font-bold text-center mb-6">Shopping Card</h1>
      
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          {/* Collection For dropdown */}
           <div>
            <label htmlFor="cat" className="block mb-1 font-medium">Collection Name:</label>
           <input 
           type='text'
           className="w-full p-2 border border-gray-300 rounded-lg"
           value={collectionName}
           onChange={(e)=>setcollectionName(e.target.value)}
           ></input>
          </div>

          <div>
            <label htmlFor="cat" className="block mb-1 font-medium">Collection For:</label>
            <select
              value={collectionFor}
              onChange={(e) => setcollectionFor(e.target.value)}
              name="type"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select</option>
              {menu.filter((item)=>(item.menuCat==="Categeroy 2")).map((item,idx)=>(<option key={idx} value={item._id}>{item.menuTitle}</option>))}
            </select>
          </div>
        
          <div>
            <label className="block mb-1 font-medium">Collection Image:</label>
            <input
              type="file"
              onChange={(e) => setcollectionImgUrl(e.target.files[0])}
              name="collectionImgUrl"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
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
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

export default UploadCollectionlist;
