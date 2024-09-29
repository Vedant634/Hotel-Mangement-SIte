package com.nirvana.Nirvana.Hotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nirvana.Nirvana.Hotel.entity.Room;
import com.nirvana.Nirvana.Hotel.entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {

    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private int numOfAdults;

    private int numOfChildren;

    private int totalGuests;

    private String bookingConfirmationCode;

    private UserDTO user;

    private RoomDTO room;
}
