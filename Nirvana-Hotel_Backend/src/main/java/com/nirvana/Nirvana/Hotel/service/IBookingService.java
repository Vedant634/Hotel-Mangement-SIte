package com.nirvana.Nirvana.Hotel.service;

import com.nirvana.Nirvana.Hotel.dto.Response;
import com.nirvana.Nirvana.Hotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
