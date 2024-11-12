import { useState } from 'react'
import viteLogo from '/vite.svg'

import './App.css'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Navbar from './component/common/Navbar'
import FooterComponent from './component/common/Footer'
import HomePage from './component/home/HomePage'
import AllRoomsPage from './component/booking/AllRoomPages'
import FindBookingPage from './component/booking/FindBookingPage'


import LoginPage from './component/auth/LoginPage'
import ProfilePage from './component/profile/ProfilePage'
import EditProfilePage from './component/profile/EditProfilePage'
import { ProtectedRoute ,AdminRoute } from './service/guard.jsx'
import RoomDetails from './component/booking/RoomDetails.jsx'
import AdminPage from './component/admin/AdminPage.jsx'
import ManageRoomPage from './component/admin/ManageRoomPage.jsx'
import ManageBookingsPage from './component/admin/ManageBookingPage.jsx'
import EditRoomPage from './component/admin/EditRoomPage.jsx'
import AddRoom from './component/admin/AddRoom.jsx'
import EditBookingPage from './component/admin/EditBookingPage.jsx'

function App() {
  

  return (
    <BrowserRouter>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route exact path='/home' element={<HomePage />} />
                    <Route exact path='/rooms' element={<AllRoomsPage />} />
                    <Route exact path='/find-bookings' element={<FindBookingPage />} />
                    <Route exact path='/login' element={<LoginPage />} />
                    
                    <Route exact path="/room-details-book/:roomId" element={<ProtectedRoute element={<RoomDetails />} />} />
                    <Route exact path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
                    <Route exact path='/edit-profile' element={<ProtectedRoute element={<EditProfilePage />} />} />
                    <Route path='*' element={<Navigate to="/home" />} />
                    <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
                    <Route path="/admin/manage-rooms" element={<AdminRoute element={<ManageRoomPage />} />} />
                    <Route path="/admin/manage-bookings" element={<AdminRoute element={<ManageBookingsPage />} />} />
                    <Route path="/admin/edit-room/:roomId" element={<AdminRoute element={<EditRoomPage />} />} />
                    <Route path="/admin/add-room" element={<AdminRoute element={<AddRoom />} />} />
                    <Route path="/admin/edit-booking/:bookingCode" element={<AdminRoute element={<EditBookingPage />} />} />
                </Routes>
            </div>
            <FooterComponent />
        </div>
    </BrowserRouter>
);

}

export default App
