package com.nirvana.Nirvana.Hotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nirvana.Nirvana.Hotel.entity.Booking;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String role;
    private List<BookingDTO> booking = new ArrayList<>();
}
