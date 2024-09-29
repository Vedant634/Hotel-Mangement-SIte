import axios from "axios"

const ApiService=()=>{

    const BASE_URL = "http://localhost:8000"

    const getHeader =()=>{
        const token = localStorage.getItem("token");
        return {
            Authorization:`Bearer ${token}`,
            ContentType: "application/json"
        };
    }
    
    const registerUser = async(registration)=>{
        const response = await axios.post(`${BASE_URL}/auth/register`, registration)
        return response.data
    }

    const loginUser = async(loginDetails)=>{
        const response = await axios.post(`${BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    const getAllUsers = async()=>{
        const response = await axios.get(`${BASE_URL}/users/all`,{
            headers:getHeader()
        })
        return response.data;
    }

    const getUserProfile = async()=>{
        const response = await axios.get(`${BASE_URL}/users/get-logged-in-profile-info`,{
            headers:getHeader()
        })
        return response.data;
    }

    const getUser = async(userId)=>{
        const response = await axios.get(`${BASE_URL}/users/get-by-id/${userId}`,{
            headers:getHeader()
        })
        return response.data;
    }

    const getUserBookings = async(userId)=>{
        const response = await axios.get(`${BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: getHeader()
        })
        return response.data
    }
    
    const deleteUser = async(userId)=>{
        const response = await axios.delete(`${BASE_URL}/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    }
    
    const addRoom = async(formData)=>{
        const result = await axios.post(`${BASE_URL}/rooms/add`, formData, {
            headers: {
                ...getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    const getAllAvailableRooms = async()=>{
        const result = await axios.get(`${BASE_URL}/rooms/all-available-rooms`)
        return result.data
    }

    const getAvailableRoomsByDateAndType = async(checkInDate, checkOutDate, roomType)=>{
        const result = await axios.get(
            `${BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
        )
        return result.data
    }
    const getRoomTypes = async()=>{
        const response = await axios.get(`${BASE_URL}/rooms/types`)
        return response.data
    }
    
    const getAllRooms = async () => {
        const result = await axios.get(`${BASE_URL}/rooms/all`);
        return result.data;
    };

    const getRoomById = async (roomId) => {
        const result = await axios.get(`${BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    };

    const deleteRoom = async (roomId) => {
        const result = await axios.delete(`${BASE_URL}/rooms/delete/${roomId}`,
            {
                headers: getHeader()
            }
        );
        return result.data;
    };

    const updateRoom = async (roomId, formData) => {
        const result = await axios.put(`${BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    };

    const bookRoom = async (roomId, userId, booking) => {
        const response = await axios.post(`${BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
            headers: getHeader()
        });
        return response.data;
    };

    const getAllBookings = async () => {
        const result = await axios.get(`${BASE_URL}/bookings/all`, {
            headers: getHeader()
        });
        return result.data;
    };

    const getBookingByConfirmationCode = async (bookingCode) => {
        const result = await axios.get(`${BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
        return result.data;
    };

    const cancelBooking = async (bookingId) => {
        const result = await axios.delete(`${BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: getHeader()
        });
        return result.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };
    
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    const isAdmin = () => {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    };

    const isUser = () => {
        const role = localStorage.getItem('role');
        return role === 'USER';
    };

    return {
        registerUser,
        loginUser,
        getAllUsers,
        getUserProfile,
        getUser,
        getUserBookings,
        deleteUser,
        addRoom,
        getAllAvailableRooms,
        getAvailableRoomsByDateAndType,
        getRoomTypes,
        getAllRooms,
        getRoomById,
        deleteRoom,
        updateRoom,
        bookRoom,
        getAllBookings,
        getBookingByConfirmationCode,
        cancelBooking,
        logout,
        isAuthenticated,
        isAdmin,
        isUser
    };
}

export default ApiService;