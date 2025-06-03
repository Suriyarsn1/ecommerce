import { useContext, useState, useRef, useEffect } from 'react';
import LinkedInicon from '../Assets/icons/linkedin.png';
import Facebookicon from '../Assets/icons/facebook.png';
import Twittericon from '../Assets/icons/twitter.png';
import Mailicon from '../Assets/icons/email.png';
import Callingicon from '../Assets/icons/phone.png';
import Profileicon from '../Assets/icons/user.png';
import Carticon from '../Assets/icons/cart.png';
import { Authcontext } from '../context/authContexts';


function Navbar() {
  const { user, Logout,token } = useContext(Authcontext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-gradient-to-b from-blue-50 via-white to-gray-100 transition-all duration-500">
      {/* Social Icons Bar */}
      <div className="bg-gradient-to-r from-blue-200 to-blue-100 flex p-2 gap-4 justify-end items-center animate-fade-in-down">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
          <img className="w-5 h-5" src={LinkedInicon} alt="LinkedIn" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
          <img className="w-5 h-5" src={Facebookicon} alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
          <img className="w-5 h-5" src={Twittericon} alt="Twitter" />
        </a>
      </div>

     
      <div className="flex flex-wrap items-center justify-between bg-white/80 backdrop-blur border-b-2 border-blue-100 p-4 md:p-6 shadow-md animate-fade-in-up">
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <div className="flex items-center gap-2">
            <img className="w-5 h-5" src={Mailicon} alt="Email" />
            <span className="font-extralight text-xs sm:text-sm text-blue-700">sample@mail.com</span>
          </div>
          <span className="hidden sm:block text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <img className="w-5 h-5" src={Callingicon} alt="Phone" />
            <span className="font-extralight text-xs sm:text-sm text-blue-700">044-285961-83546</span>
          </div>
        </div>

        {/* Site Title */}
        <div className="flex-1 flex justify-center">
          <span className="title_name text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide text-blue-500 drop-shadow-lg transition-colors duration-300 hover:text-blue-700">
            Fashion Cloths 
          </span>
        </div>

        {/* User/Cart/Profile */}
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          {token ? (
            <div className="flex gap-4 items-center relative" ref={dropdownRef}>
              {/* Profile Dropdown */}
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <img
                  className="w-7 h-7 rounded-full border-2 border-blue-200 shadow-sm hover:scale-110 transition-transform duration-200"
                  src={Profileicon}
                  alt="Profile"
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white/95 rounded-xl shadow-xl z-20 transition-all duration-300 flex flex-col border border-blue-100
                  ${dropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                `}
                style={{ transformOrigin: 'top right' }}
              >
                <p className="px-4 py-2 border-b text-blue-700 font-semibold select-none">{user?.toUpperCase()}</p>
                <a className="px-4 py-2 hover:bg-blue-50 transition cursor-pointer" href="/user/orders">Your Orders</a>
                <a className="px-4 py-2 hover:bg-blue-50 transition cursor-pointer" href="/user/home">Home</a>
                <button className="px-4 py-2 text-left hover:bg-blue-50 transition cursor-pointer" onClick={Logout}>Logout</button>
              </div>

              {/* Cart Icon */}
              <a href="/user/cart" className="hover:scale-110 transition-transform duration-200">
                <img className="w-7 h-7" src={Carticon} alt="Cart" />
              </a>
            </div>
          ) : (
            <a href="/user/login" className="hover:scale-110 transition-transform duration-200">
              <img className="w-7 h-7 rounded-full border-2 border-blue-200 shadow-sm" src={Profileicon} alt="Login" />
            </a>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
