import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context for collections
export const CollectionContext = createContext();

const CollectionProvider = ({ children }) => {
  // State for all collections and loading status
  const [collections, setCollections] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [isActiveCollection, setisActiveCollection] = useState([])
  const navigate = useNavigate();

  // Fetch collections from API on mount




  useEffect(() => {
    const fetchCollections = async () => {
      setCollectionLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/collection/getlist`);
        console.log(res.data)
        setCollections(res.data);
        setisActiveCollection(collections.filter((item) => item.collectionFor ==="681db3798321c108a5d19c0c"));
      } catch (err) {
        console.error("Fetching Failed:", err);
      } finally {
        setCollectionLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // Delete a collection by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/collection/deletecollection/${id}`);
        // Remove the deleted collection 
        setCollections(prev => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.log('Card Deletion Failed', err);
      }
    }
  };

  // Navigate to update page for a specific collection
  const handleUpdate = (id) => {
    navigate(`/admin/update/collectionlist/${id}`);
  };


  const handleSelectedMenu = (menuId) => {
       
      if (collections) {
        setisActiveCollection(collections.filter((item) => item.collectionFor === menuId))
      }
 }
    // Provide collections
    return (
      <CollectionContext.Provider value={{
        collections,
        collectionLoading,
        handleDelete,
        handleUpdate,
        handleSelectedMenu,
        isActiveCollection,
      }}>
        {children}
      </CollectionContext.Provider>
    );
  };

  export default CollectionProvider;
