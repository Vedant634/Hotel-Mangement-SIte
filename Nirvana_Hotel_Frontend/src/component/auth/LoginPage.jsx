import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import photo from "../../assets/images/pexels-pixabay-258154.jpg";

export default function AuthForm() {
  const apiService = ApiService();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For registration
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Reset error on toggle
    setSuccessMessage(''); // Reset success message on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isLogin ? false : !username)) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      if (isLogin) {
        // Handle login
        const response = await apiService.loginUser({ email, password });
        if (response.statusCode === 200) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          navigate('/home', { replace: true });
        }
      } else {
        // Handle registration
        const response = await apiService.registerUser({ username, email, password });
        if (response.statusCode === 201) {
          setSuccessMessage('User registered successfully! You can now log in.');
          setTimeout(() => {
            setIsLogin(true); // Switch to login after successful registration
            setSuccessMessage('');
          }, 3000);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div 
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <h1 className="text-3xl font-semibold text-white pt-16 text-center">My Account</h1>
      </div>
      <div className="max-w-2xl mx-auto mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {/* Show error message if any */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Show success message if registration is successful */}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {isLogin ? 'Username or email address' : 'Email address'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          {isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            {isLogin ? 'Log in' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={toggleForm} 
            className="text-sm text-amber-500 hover:text-amber-500"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
