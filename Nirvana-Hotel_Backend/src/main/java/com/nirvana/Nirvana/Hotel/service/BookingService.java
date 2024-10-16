package com.nirvana.Nirvana.Hotel.service;

import com.nirvana.Nirvana.Hotel.dto.BookingDTO;
import com.nirvana.Nirvana.Hotel.dto.Response;
import com.nirvana.Nirvana.Hotel.entity.Booking;
import com.nirvana.Nirvana.Hotel.entity.Room;
import com.nirvana.Nirvana.Hotel.entity.User;
import com.nirvana.Nirvana.Hotel.exception.OurException;
import com.nirvana.Nirvana.Hotel.repo.BookingRepository;
import com.nirvana.Nirvana.Hotel.repo.RoomRepository;
import com.nirvana.Nirvana.Hotel.repo.UserRepository;
import com.nirvana.Nirvana.Hotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookingService implements IBookingService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // @Autowired
    // private RoomService roomService;

    @Override
    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {
        Response response =new Response();
        try{
            if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
                throw new IllegalArgumentException("Check In date must come before checkout date");
            }
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room Not Found"));
            User user = userRepository.findById(userId).orElseThrow(()-> new OurException("User Not Found"));

            List<Booking> existingBookings = room.getBookings();
            if(!roomIsAvailable(bookingRequest,existingBookings)){
                throw new OurException("Room is Not available for given dates");
            }

            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);
            response.setStatusCode(200);
            response.setMessage("succesful");
            response.setBookingConformationCode(bookingConfirmationCode);

        }catch(OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch ( Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Saving a booking :"+e.getMessage());
        }

        return response;
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {
        Response response =new Response();
        try{
            Booking booking =bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()->new OurException("Booking Not Found"));
            System.out.println(booking);
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTOPlusBookedRooms(booking,true);
            response.setStatusCode(200);
            response.setMessage("succesful");
            response.setBooking(bookingDTO);

        }catch(OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch ( Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Saving a booking :"+e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response =new Response();
        try{
           List<Booking> bookingList =bookingRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookingList);
            response.setStatusCode(200);
            response.setMessage("succesful");
            response.setBookingList(bookingDTOList);

        }catch(OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch ( Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Saving a booking :"+e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response =new Response();
        try{
            Booking booking =bookingRepository.findById(bookingId).orElseThrow(()->new OurException("Booking Does Not Exist"));
           bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("succesful");


        }catch(OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch ( Exception e){
            response.setStatusCode(500);
            response.setMessage("Error Saving a booking :"+e.getMessage());
        }
        System.out.println(response);
        return response;
    }
}
