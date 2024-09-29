import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function EditBookingPage() {
  const apiService = ApiService();
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await apiService.getBookingByConfirmationCode(bookingCode);
        console.log(response.booking);
        setBookingDetails(response.booking);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookingDetails();
  }, [bookingCode]);

  const acheiveBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to Achieve this booking?')) {
      return;
    }

    try {
      const response = await apiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was Successfully Achieved");

        setTimeout(() => {
          setSuccessMessage('');
          navigate('/admin/manage-bookings');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Booking Detail</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {bookingDetails && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Booking Details</h3>
            <div className="bg-gray-70 p-4 rounded-lg shadow-sm mb-4">
              <p><span className="font-semibold">Confirmation Code: </span>{bookingDetails.bookingConfirmationCode}</p>
              <p><span className="font-semibold">Check-in Date: </span>{bookingDetails.checkInDate}</p>
              <p><span className="font-semibold">Check-out Date: </span>{bookingDetails.checkOutDate}</p>
              <p><span className="font-semibold">Num Of Adults: </span>{bookingDetails.numOfAdults}</p>
              <p><span className="font-semibold">Num Of Children: </span>{bookingDetails.numOfChildren}</p>
              <p><span className="font-semibold">Guest Email: </span>{bookingDetails.guestEmail}</p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Booker Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <p><span className="font-semibold">Name: </span>{bookingDetails.user.name}</p>
              <p><span className="font-semibold">Email: </span>{bookingDetails.user.email}</p>
              <p><span className="font-semibold">Phone Number: </span>{bookingDetails.user.phoneNumber}</p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Room Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <p><span className="font-semibold">Room Type: </span>{bookingDetails.room.roomType}</p>
              <p><span className="font-semibold">Room Price: </span>${bookingDetails.room.roomPrice}</p>
              <p><span className="font-semibold">Room Description: </span>{bookingDetails.room.roomDescription}</p>
              <img
                src={bookingDetails.room.roomPhotoUrl}
                alt={bookingDetails.room.roomType}
                className="mt-2 w-full h-48 object-cover rounded-md"
              />
            </div>
            <button
              className="bg-amber-500 text-white rounded-md px-6 py-2 hover:bg-amber-600 transition duration-200 w-full"
              onClick={() => acheiveBooking(bookingDetails.id)}
            >
              Achieve Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditBookingPage;
