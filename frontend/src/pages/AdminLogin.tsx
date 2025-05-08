import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import axios from '../utils/axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
  
      localStorage.setItem('token', token);
      navigate('/');
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
 <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">


<button
  onClick={() => navigate("/")}
  className="absolute top-4 left-4 text-gray-700 hover:text-indigo-600 font-medium flex items-center space-x-1"
>
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  <span>Back</span>
</button>


<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 mt-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

  <form
    className="space-y-4"
    onSubmit={(e) => {
      e.preventDefault();
      login(email, password);
    }}
  >

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder="your@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>


    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
    >
      Sign In
    </button>
  </form>

</div>
</div>
    </div>
  )
}

export default AdminLogin
