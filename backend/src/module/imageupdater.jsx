import React, { useState } from "react";

function ImageUpdater() {
  // State for form fields and upload status
  const [collectionTypeName, setcollectionTypeName] = useState("");
  const [collectionFor, setcollectionFor] = useState("");
  const [collectionImgUrl, setcollectionImgUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle form submission
  const handlesubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("Uploading...");
  
    const formData = new FormData();
    formData.append("collectionTypeName", collectionTypeName);
    formData.append("collectionFor", collectionFor);
    formData.append("collectionImgUrl", collectionImgUrl);


    setTimeout(() => {
      setUploadStatus("Upload Successful!");
      setcollectionTypeName("");
      setcollectionFor("");
      setcollectionImgUrl(null);
    }, 1200);
  };

  return (
    
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10 animate-fade-in-up transition-all">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Shopping Card</h1>
        {/* Upload form */}
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
          {/* Collection Name input */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Collection Name:</label>
            <input
              type="text"
              value={collectionTypeName}
              onChange={(e) => setcollectionTypeName(e.target.value)}
              name="name"
              placeholder="Enter title of the Collection..."
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              required
            />
          </div>
          {/* Collection For dropdown */}
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
              <option value="Kids">Kids</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          {/* Image upload input */}
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
          {/* Upload button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
            type="submit"
          >
            Upload
          </button>
          {/* Upload status message */}
          {uploadStatus && (
            <p className={`text-center mt-2 ${uploadStatus.includes("Success") ? "text-green-600" : "text-blue-600"}`}>
              {uploadStatus}
            </p>
          )}
        </form>
        {/* Link to admin page */}
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

export default ImageUpdater;
