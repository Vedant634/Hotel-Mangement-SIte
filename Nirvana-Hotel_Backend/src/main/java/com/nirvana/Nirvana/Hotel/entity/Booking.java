package com.nirvana.Nirvana.Hotel.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@Table(name="bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Check in date is required")
    private LocalDate checkInDate;
    @Future(message = "Check out date must be provided in future")
    private LocalDate checkOutDate;


    private int numOfAdults;

    private int numOfChildren;
    private int totalGuests;
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public void calcluateTotalnumberOfGuests(){
        this.totalGuests=this.numOfAdults+this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calcluateTotalnumberOfGuests();
    }

    public void setNumOfChildren( int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calcluateTotalnumberOfGuests();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalGuests=" + totalGuests +
                ", bookingConfirmationCode='" + bookingConfirmationCode +
                '}';
    }

}
