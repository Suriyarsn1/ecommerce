import { useState } from "react";
import { FaListAlt, FaBoxes, FaThLarge, FaTruck, FaSearch } from "react-icons/fa";

function Admin() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center py-10 px-2">
      {/* Header */}
      <div className="mb-10 text-center animate-fade-in-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-3 drop-shadow-lg">
          Admin Dashboard
        </h1>
        <p className="text-base sm:text-lg text-blue-900 font-medium">
          Manage your e-commerce website with ease and style.
        </p>
      </div>

      {/* Admin action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl animate-fade-in-up">
        {/* Edit Menu */}
        <a href="/admin/menu" className="group">
          <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-blue-200 transition-all duration-300 flex flex-col items-center cursor-pointer hover:scale-105">
            <FaThLarge className="text-3xl sm:text-4xl text-blue-500 mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">Edit Menu</h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Add, edit, or remove menu categories.</p>
          </div>
        </a>

        {/* Product List */}
        <a href="/admin/productlist" className="group">
          <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-blue-200 transition-all duration-300 flex flex-col items-center cursor-pointer hover:scale-105">
            <FaBoxes className="text-3xl sm:text-4xl text-blue-500 mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">Product List</h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Manage all products and their details.</p>
          </div>
        </a>

        {/* Collections List */}
        <a href="/admin/collectionlist" className="group">
          <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-blue-200 transition-all duration-300 flex flex-col items-center cursor-pointer hover:scale-105">
            <FaListAlt className="text-3xl sm:text-4xl text-blue-500 mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">Collections List</h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Organize and update product collections.</p>
          </div>
        </a>

        {/* Order Management */}
        <a href="/admin/oder/management" className="group">
          <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-blue-200 transition-all duration-300 flex flex-col items-center cursor-pointer hover:scale-105">
            <FaTruck className="text-3xl sm:text-4xl text-blue-500 mb-4 group-hover:rotate-12 transition-transform duration-300" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">Order Management</h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">Track and process customer orders.</p>
          </div>
        </a>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
}

export default Admin;

