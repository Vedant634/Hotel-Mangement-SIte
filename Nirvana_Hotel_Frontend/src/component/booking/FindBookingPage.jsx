import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const FindBookingPage = () => {
  const apiService = ApiService();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      const response = await apiService.getBookingByConfirmationCode(
        confirmationCode
      );
      console.log(response);
      setBookingDetails(response.booking);
      setError(null);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Find Booking</h2>
        <div className="flex mb-4">
          <input
            required
            type="text"
            placeholder="Enter your booking confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleSearch}
            className="bg-amber-500 text-white rounded-r-md px-4 hover:bg-amber-600 transition duration-200"
          >
            Find
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {bookingDetails && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Booking Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <p>
                <span className="font-semibold">Confirmation Code: </span>
                {bookingDetails.bookingConfirmationCode}
              </p>
              <p>
                <span className="font-semibold">Check-in Date: </span>
                {bookingDetails.checkInDate}
              </p>
              <p>
                <span className="font-semibold">Check-out Date: </span>
                {bookingDetails.checkOutDate}
              </p>
              <p>
                <span className="font-semibold">Num Of Adults: </span>
                {bookingDetails.numOfAdults}
              </p>
              <p>
                <span className="font-semibold">Num Of Children: </span>
                {bookingDetails.numOfChildren}
              </p>
            </div>

            <hr className="my-4" />

            <h3 className="text-xl font-semibold mb-2">Booker Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <p>
                <span className="font-semibold">Name: </span>
                {bookingDetails.user.name}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {bookingDetails.user.email}
              </p>
              <p>
                <span className="font-semibold">Phone Number: </span>
                {bookingDetails.user.phoneNumber}
              </p>
            </div>

            <hr className="my-4" />

            <h3 className="text-xl font-semibold mb-2">Room Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p>
                <span className="font-semibold">Room Type: </span>
                {bookingDetails.room.roomType}
              </p>
              <img
                src={bookingDetails.room.roomPhotoUrl}
                alt={bookingDetails.room.roomType}
                className="w-full h-48 object-cover mt-2 rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBookingPage;
