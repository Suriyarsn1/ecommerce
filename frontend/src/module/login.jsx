import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  // State for form fields and message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_SERVER_URL} /api/login`, { email, password })
      .then((data) => { console.log(data.data.checkUser.roll)
        // Store user info in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('roll', JSON.stringify(data.data.checkUser.roll));
        localStorage.setItem('user', JSON.stringify(data.data.checkUser.username));
        localStorage.setItem('userId', data.data.checkUser.userId);
       //Navigate based on user role
        if (data.data.checkUser.roll !== 'admin') {
          navigate('/');
        } else {
          navigate('/admin/home');
        }
      })
      .catch((err) => {
        setMsg('Invalid! Please Register');
      });
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 animate-fade-in-up transition-all">

        <h1 className="text-2xl text-center font-bold mb-6 text-blue-500">Login</h1>
      
        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 bg-transparent rounded-lg outline-none font-thin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>
   
          <div className="flex justify-between items-center">
          
            <a
              href="/user/register"
              className="px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse"
            >
              Register
            </a>
       
            <button
              type="submit"
              className="px-5 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 animate-pulse"
            >
              Login
            </button>
          </div>
        </form>
    
        <div className="text-center mt-5 text-red-600 font-medium min-h-[24px]">
          {msg}
        </div>
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

export default Login;
