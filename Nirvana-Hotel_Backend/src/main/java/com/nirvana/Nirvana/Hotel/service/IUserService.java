package com.nirvana.Nirvana.Hotel.service;

import com.nirvana.Nirvana.Hotel.dto.LoginRequest;
import com.nirvana.Nirvana.Hotel.dto.Response;
import com.nirvana.Nirvana.Hotel.entity.User;

public interface IUserService {

    Response register(User loginRequest);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserId(String userId);

    Response getMyInfo(String email);

}
