import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../service/ApiService";

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState(null);
  const apiService = ApiService();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await apiService.getRoomTypes();
        setRoomTypes(types);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeOut = 5000) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, timeOut);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError("Please select all fields");
      return false;
    }

    try {
      const formattedStartDate = startDate
        ? startDate.toISOString().split("T")[0]
        : null;
      const formattedEndDate = endDate
        ? endDate.toISOString().split("T")[0]
        : null;

      const response = await apiService.getAvailableRoomsByDateAndType(
        formattedStartDate,
        formattedEndDate,
        roomType
      );

      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError("No rooms currently available for the selected room type and date range");
          return;
        }

        handleSearchResult(response.roomList);
        setError("");
      }
    } catch (e) {
      showError(e.response?.data?.message);
    }
  };

  return (
    <section className="flex justify-center items-center w-full max-w-7xl mx-auto p-6"> {/* Updated section */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Room Search</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="search-field border-2 border-gray-400 rounded-md p-4 flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Check-in Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Check-in Date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="search-field border-2 border-gray-400 rounded-md p-4 flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Check-out Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Check-out Date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="search-field border-2 border-gray-400 rounded-md p-4 flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option disabled value="">
                Select Room Type
              </option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-md transition duration-300 w-40 h-14 flex items-center justify-center" // Increased width and height
            onClick={handleInternalSearch}
          >
            Search Rooms
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
      </div>
    </section>
  );
};

export default RoomSearch;
