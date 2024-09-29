import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function EditProfilePage() {
  const apiService = ApiService();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.getUserProfile();
        setUser(response.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handelDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return;

    try {
      await apiService.deleteUser(user.id);
      navigate('/signup');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {user && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </div>
            <button
              className="w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-200"
              onClick={handelDeleteProfile}
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfilePage;
