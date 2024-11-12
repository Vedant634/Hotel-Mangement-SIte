import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';
import { NavLink, useNavigate } from 'react-router-dom';

const AllRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(5);

    const apiService = ApiService();
    const isAuthenticated = apiService.isAuthenticated();
    const navigate = useNavigate();
    const isAdmin = apiService.isAdmin();

    const handleSearchResult = (results) => {
        setRooms(results);
        setFilteredRooms(results);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await apiService.getAllRooms();
                const allRooms = response.roomList;
                setRooms(allRooms);
                setFilteredRooms(allRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error.message);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const types = await apiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
        filterRooms(e.target.value);
    };

    const filterRooms = (type) => {
        if (type === '') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === type);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <h2 className='text-3xl font-bold mb-6 text-center'>All Rooms</h2>
            
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <div className='flex items-center mb-4 md:mb-0'>
                    <label className='mr-3 font-semibold'>Filter by Room Type:</label>
                    <select
                        value={selectedRoomType}
                        onChange={handleRoomTypeChange}
                        className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-amber-500'
                    >
                        <option value="">All</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {isAuthenticated && isAdmin && (
                    <button
                        className='mt-2 md:mt-0 bg-amber-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-amber-600 transition duration-200'
                        onClick={() => navigate('/admin/add-room')}
                    >
                        Add Room
                    </button>
                )}
            </div>
            
            <RoomSearch handleSearchResult={handleSearchResult} />
            
            <div >
    <RoomResult roomSearchResults={currentRooms} />
</div>

  
            <div className='flex justify-center mt-6'>
                <Pagination
                    roomsPerPage={roomsPerPage}
                    totalRooms={filteredRooms.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default AllRoomsPage;
