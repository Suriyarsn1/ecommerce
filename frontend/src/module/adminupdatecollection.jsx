import { useEffect, useState,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UtilityContext } from '../context/menuContext';

function AdminUpdateCollectionList() {
  const { id } = useParams();
  const {menu}=useContext(UtilityContext)
  const navigate = useNavigate();
  const [updateStatus, setUpdateStatus] = useState('');
  const [collectionImgUrl, setCollectionImgUrl] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const [updateCollection, setUpdateCollection] = useState({
    collectionTypeName: '',
    collectionFor: '',
  });

  // Clean up preview URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (previewImg && previewImg.startsWith('blob:')) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, [previewImg]);

  // Fetch existing collection details
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/collection/getlist/${id}`);
        setUpdateCollection({
          collectionTypeName: res.data.collectionTypeName || '',
          collectionFor: res.data.collectionFor || '',
        });
        setPreviewImg(res.data.collectionImgUrl);
      } catch (err) {
        console.error("Fetching Failed:", err);
        setUpdateStatus('Failed to fetch collection details');
      }
    };
    fetchCollection();
  }, [id]);

  // Handle text input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateCollection({ ...updateCollection, [name]: value });
  }

  // Handle file input change and set preview
  function handleFileChange(e) {
    if (previewImg && previewImg.startsWith('blob:')) {
      URL.revokeObjectURL(previewImg);
    }
    const file = e.target.files[0];
    setCollectionImgUrl(file);
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    } else {
      setPreviewImg('');
    }
  }

  // Handle form submission to update the collection
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus('Updating...');
    const formData = new FormData();
    formData.append('collectionTypeName', updateCollection.collectionTypeName);
    formData.append('collectionFor', updateCollection.collectionFor);
    if (collectionImgUrl) {
      formData.append('collectionImgUrl', collectionImgUrl); // or 'file' if your backend expects it
    }
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/collection/update/${id}`, formData);
      setUpdateStatus('Update Details Successfully');
      setTimeout(() => navigate('/admin/collectionlist'), 1200);
    } catch (err) {
      setUpdateStatus(`Failed to Save: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 mt-10 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-center mb-6">Update Collection</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <div>
            <label htmlFor="collectionFor" className="block mb-1 font-medium">Collection For:</label>
            <select
              id="collectionFor"
              name='collectionFor'
              value={updateCollection.collectionFor}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select</option>
              {menu.filter(item => item.menuCat === "Categeroy 2").map((item, idx) => (
                <option key={idx} value={item._id}>{item.menuTitle}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Collection Image:</label>
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
            type="submit"
          >
            {updateStatus === 'Updating...' ? 'Updating...' : 'Update'}
          </button>
          {updateStatus && (
            <p className={`text-center mt-2 ${updateStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
              {updateStatus}
            </p>
          )}
        </form>
        <a className="block mt-6 text-blue-600 underline text-center" href="/admin">
          Go to Admin Page
        </a>
      </div>
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

export default AdminUpdateCollectionList;
