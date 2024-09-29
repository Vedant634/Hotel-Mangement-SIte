import React from 'react';
import { AppBar, Toolbar, Button, styled } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from "../../service/ApiService";

// Custom styled AppBar with white background
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

// Custom styled Button with dark text
const CustomButton = styled(Button)(({ theme }) => ({
  color: '#1A202C', // Dark gray text
  margin: '0 4px',
  padding: '6px 16px',
  borderRadius: '9999px', // Full rounded
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}));

const LoginButton = styled(CustomButton)({
  border: '1px solid #4A5568', // Border color
  '&:hover': {
    backgroundColor: '#4A5568',
    color: 'white',
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const apiService = ApiService();
  const isAuthenticated = apiService.isAuthenticated();
  const isAdmin = apiService.isAdmin();
  const isUser = apiService.isUser();

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you really want to logout?");
    if (isLogout) {
      apiService.logout();
      navigate('/home');
    }
  };

  return (
    <CustomAppBar position="static">
      <Toolbar className="flex justify-between p-3">
     
        <div className="text-gray-800 text-2xl font-bold tracking-wide">
          Nirvana Hotel
        </div>

      
        <div className="flex space-x-2">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            <CustomButton>HOME</CustomButton>
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>
            <CustomButton>ROOMS</CustomButton>
          </NavLink>
          
          {isUser && (
            <NavLink to="/find-bookings" className={({ isActive }) => (isActive ? 'active' : '')}>
            <CustomButton>FIND MY BOOKING</CustomButton>
          </NavLink>
          )}
          
          {isUser && (
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CustomButton>PROFILE</CustomButton>
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CustomButton>ADMIN</CustomButton>
            </NavLink>
          )}
          
          {!isAuthenticated && (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              <LoginButton variant="outlined">LOGIN</LoginButton>
            </NavLink>
          )}
          {/* {!isAuthenticated && (
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CustomButton>REGISTER</CustomButton>
            </NavLink>
          )} */}

          {isAuthenticated && (
            <span onClick={handleLogout}>
              <CustomButton>LOGOUT</CustomButton>
            </span>
          )}
        </div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
