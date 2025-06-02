import { useState } from "react";

function DropdownMenu() {
  // State to control dropdown open/close
  const [open, setOpen] = useState(false);

  return (
  
    <div className="relative inline-block text-left">
      {/* Dropdown trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        Menu
        {/* Arrow icon with rotation animation */}
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ${
          open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}
      >
        <ul className="py-2">
          {/* Profile Setting option */}
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
            >
              Profile Setting
            </a>
          </li>
          {/* Logout option */}
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
