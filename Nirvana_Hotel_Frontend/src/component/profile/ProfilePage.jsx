import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
  const apiService = ApiService();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); 
      try {
        const response = await apiService.getUserProfile();
        const userPlusBooking = await apiService.getUserBookings(
          response.user.id
        );
        setUser(userPlusBooking.user);
      } catch (error) {
        setError(
          error.response?.data?.message || error.message || "An error occurred"
        );
      } finally {
        setLoading(false); 
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-600">
        Welcome, {user ? user.name : "User"}
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-4xl">
        {" "}
      
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-amber-600 transition duration-200"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {user && (
          <div className="profile-details mb-6">
            <h3 className="text-2xl font-semibold mb-2">My Profile Details</h3>{" "}
           
            <p className="mb-3 text-lg">
              <strong>Email:</strong> {user.email}
            </p>{" "}
           
            <p className="mb-1 text-lg">
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>{" "}
           
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {" "}
       
        <h3 className="text-xl font-semibold mb-4">My Booking History</h3>
        <div className="booking-list grid grid-cols-1 gap-12">
          {user && user.booking && user.booking.length > 0 ? (
            user.booking.map((booking) => (
              <div
                key={booking.id}
                className="booking-item p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-gray-100"
              >
                <p className="mb-1">
                  <strong>Booking Code:</strong>{" "}
                  {booking.bookingConfirmationCode}
                </p>
                <p className="mb-1">
                  <strong>Check-in Date:</strong> {booking.checkInDate}
                </p>
                <p className="mb-1">
                  <strong>Check-out Date:</strong> {booking.checkOutDate}
                </p>
                <p className="mb-1">
                  <strong>Total Guests:</strong>{" "}
                  {booking.numOfAdults + booking.numOfChildren}
                </p>
                <p className="mb-1">
                  <strong>Room Type:</strong> {booking.room?.roomType || "N/A"}
                </p>
                {booking.room && (
                  <img
                    src={booking.room.roomPhotoUrl}
                    alt="Room"
                    className="rounded-md mt-2 w-full h-48 object-cover"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
