package com.nirvana.Nirvana.Hotel.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @NotBlank(message = "Email is Required")
    private String email ;

    @NotBlank(message = "Password is Required")
    private String password;
}
