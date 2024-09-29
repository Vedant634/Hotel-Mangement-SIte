import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid2, 
  CircularProgress,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const apiService = ApiService();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState(""); 
  const endOfPageRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await apiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setMessage('Please select check-in and check-out dates.');
      scrollToBottom();
      return;
    }

    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setMessage('Please enter valid numbers for adults and children.');
      scrollToBottom();
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000; 
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(numAdults + numChildren);
    scrollToBottom(); 
  };

  const acceptBooking = async () => {
    try {
      const booking = {
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
  
      const response = await apiService.bookRoom(roomId, userId, booking);
  
      if (response.statusCode === 200) {
        const code = response.bookingConformationCode;
       
        setConfirmationCode(code); 
        setMessage(`Booking successful! Confirmation code: ${code}`); 
  
        setTimeout(() => {
          navigate("/rooms");
        }, 10000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };
   

  const scrollToBottom = () => {
    endOfPageRef.current?.scrollIntoView({ behavior: "smooth" }); 
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!roomDetails) {
    return <Typography>Room not found.</Typography>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <Box sx={{ padding: 4, paddingBottom: 16 }}> 
      {message && <Typography color="primary">{message}</Typography>} 
      <Typography variant="h4" align="center" gutterBottom>
        Room Details
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="200" 
          image={roomPhotoUrl}
          alt={roomType}
        />
        <CardContent>
          <Typography variant="h5">{roomType}</Typography>
          <Typography variant="h6" color="primary">${roomPrice} / night</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
            {/* More detailed description */}
            This room offers a cozy and comfortable space for relaxation, featuring modern amenities and stunning views. Perfect for families or solo travelers, it promises a memorable stay.
          </Typography>
        </CardContent>
      </Card>
      {bookings && bookings.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Existing Booking Details</Typography>
          <Grid2 container spacing={2}> {/* Use Grid2 */}
            {bookings.map((booking, index) => (
              <Grid2 item xs={12} sm={6} key={booking.id}> {/* Use Grid2 */}
                <Card>
                  <CardContent>
                    <Typography>Booking {index + 1}</Typography>
                    <Typography>Check-in: {booking.checkInDate}</Typography>
                    <Typography>Check-out: {booking.checkOutDate}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
      <Box mt={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={() => setShowDatePicker(true)}>
          Book Now
        </Button>
        {showDatePicker && (
          <Box mt={2}>
            <DatePicker
              selected={checkInDate}
              onChange={date => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={checkOutDate}
              onChange={date => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
              dateFormat="dd/MM/yyyy"
            />
            <Box mt={2}>
              <TextField
                label="Adults"
                type="number"
                slotProps={{ htmlInput: { min: 1 } }} // Use slotProps
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                sx={{ marginRight: 2 }}
              />
              <TextField
                label="Children"
                type="number"
                slotProps={{ htmlInput: { min: 0 } }} // Use slotProps
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value))}
              />
              <Button variant="contained" color="secondary" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </Box>
          </Box>
        )}
        {totalPrice > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Total Price: ${totalPrice}</Typography>
            <Typography>Total Guests: {totalGuests}</Typography>
            <Button variant="contained" color="secondary" onClick={acceptBooking}>
              Accept Booking
            </Button>
          </Box>
        )}
      </Box>
      <div ref={endOfPageRef} /> 
    </Box>
  );
};

export default RoomDetails;
