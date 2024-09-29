package com.nirvana.Nirvana.Hotel.service;

import com.nirvana.Nirvana.Hotel.dto.LoginRequest;
import com.nirvana.Nirvana.Hotel.dto.Response;
import com.nirvana.Nirvana.Hotel.dto.UserDTO;
import com.nirvana.Nirvana.Hotel.entity.User;
import com.nirvana.Nirvana.Hotel.exception.OurException;
import com.nirvana.Nirvana.Hotel.repo.UserRepository;
import com.nirvana.Nirvana.Hotel.utils.JWTUtils;
import com.nirvana.Nirvana.Hotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

//    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public Response register(User user) {
        Response response = new Response();
        try{
             if(user.getRole() == null || user.getRole().isBlank()){
                user.setRole("USER");
            }
             if(userRepository.existsByEmail(user.getEmail())){
                throw new OurException(user.getEmail() + "Already Exist");
             }

             user.setPassword(passwordEncoder.encode(user.getPassword()));
             User saveuser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(saveuser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(400);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));

               User user =  userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(()->new OurException("user Not Found"));
                String token = jwtUtils.generateToken(user);
            if(!authentication.isAuthenticated()){
                throw new OurException("Not Authenticated");
            }
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("Successful");
        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(400);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;


    }

    @Override
    public Response getAllUsers() {

        Response response =new Response();
        try{
        List<User> userList =userRepository.findAll();
        List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
        response.setStatusCode(200);
        response.setMessage("succesful");
        response.setUserList(userDTOList);
        }
        catch (Exception e){
            response.setStatusCode(400);
            response.setMessage("Error getting all users" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
            Response response =new Response();
        try{
            User user  = userRepository.findById(Long.valueOf(userId)).orElseThrow( ()->new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingAndRoom(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("Success");

        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response =new Response();
        try{
            userRepository.findById(Long.valueOf(userId)).orElseThrow( ()->new OurException("User Not Found"));
            userRepository.deleteById(Long.valueOf(userId));

            response.setStatusCode(200);
            response.setMessage("Success");

        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserId(String userId) {
        Response response =new Response();
        try{
            User user  = userRepository.findById(Long.valueOf(userId)).orElseThrow( ()->new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("Success");

        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response =new Response();
        try{
            User user  = userRepository.findByEmail(email).orElseThrow( ()->new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            response.setMessage("Success");

        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }
}
