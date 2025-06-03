import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [error, setError] = useState('');

  // Handle registration 
  const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== cpassword) {
    setError('Passwords do not match');
    return;
  }

  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/register`,
      { email, password, username }
    );
    setError(null); // Clear any previous errors
    setError('Successfully Registered');
    setTimeout(() => navigate('/user/login'), 1000);
  } catch (err) {
    // Prefer backend error message if available
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('Registration failed. Please try again.');
    }
  }
};

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
     
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 animate-fade-in-up transition-all">
       
        <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">Registration Form</h1>
       
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">User Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          {/* Email input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {/* Password input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {/* Confirm password input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse"
          >
            Register
          </button>
          {/* Error or success message */}
          {error && (
            <p className={`text-center mt-2 ${error.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
              {error}
            </p>
          )}
        </form>
      </div>
      {/* Fade-in animation style */}
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

export default Register;
