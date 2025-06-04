import { useContext } from "react";
import { CollectionContext } from '../context/collectionContext';
import { UtilityContext } from "../context/menuContext";

function AdminCollectionlist() {
  const { collections, collectionLoading, handleDelete, handleUpdate } = useContext(CollectionContext);
  const { menu } = useContext(UtilityContext);

  // Pre-filter menu items for better readability (optional)
  // const filteredMenu = menu.filter(item => item.menuCat === "Category 2");

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
        <a href="/admin/upload/collectionlist">
          <button className='px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse'>
            Collections Upload
          </button>
        </a>
        <a href="/admin/home" className="text-blue-600 underline text-sm">Go to Admin Page</a>
      </div>

      <div className="p-4">
        {collectionLoading ? (
          <p className="text-center text-lg text-gray-500 animate-pulse">Your Collections are On the Way...</p>
        ) : !collections.length ? (
          <p className="text-center text-lg text-gray-500">Your Collection is Empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {collections.map((c, index) => {
              // Find the matching menu item for this collection
              const matchedMenu = menu.find(item =>
                item.menuCat === "Categeroy 2" && item._id === c.collectionFor
              );
              return (
                <article
                  key={c._id || index}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-8 pt-36 max-w-sm mx-auto shadow-xl bg-white group transition-transform duration-500 hover:scale-105 hover:shadow-blue-400/40 animate-fade-in-up"
                  style={{ minHeight: "350px" }}
                >
                  <img
                    src={c.collectionImgUrl}
                    alt={c.collectionName || 'Collection image'}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"  
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 via-gray-900/10 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="relative z-20">
                    {matchedMenu && (
                      <h3 className="mt-3 text-2xl font-bold text-white drop-shadow">
                        {matchedMenu.menuTitle}
                      </h3>
                    )}
                    <div className="mt-1 mb-5 text-xs text-gray-200 truncate">{c._id}</div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-700 text-white font-semibold shadow transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleUpdate(c._id)}
                        className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow transition"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </>
  );
}

export default AdminCollectionlist;
