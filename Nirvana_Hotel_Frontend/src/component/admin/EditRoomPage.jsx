import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function EditRoomPage() {
    const apiService = ApiService();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await apiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }
            const result = await apiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');

                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await apiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Room deleted successfully.');

                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 500);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Room</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <div className="edit-room-form mt-4">
                    <div className="form-group mb-4">
                        {preview ? (
                            <img src={preview} alt="Room Preview" className="h-40 w-full object-cover rounded-md mb-2" />
                        ) : (
                            roomDetails.roomPhotoUrl && (
                                <img src={roomDetails.roomPhotoUrl} alt="Room" className="h-40 w-full object-cover rounded-md mb-2" />
                            )
                        )}
                        <input
                            type="file"
                            name="roomPhoto"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-semibold">Room Type</label>
                        <input
                            type="text"
                            name="roomType"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-semibold">Room Price</label>
                        <input
                            type="text"
                            name="roomPrice"
                            value={roomDetails.roomPrice}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="block text-gray-700 font-semibold">Room Description</label>
                        <textarea
                            name="roomDescription"
                            value={roomDetails.roomDescription}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        ></textarea>
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mb-2 hover:bg-blue-600 transition duration-200"
                        onClick={handleUpdate}
                    >
                        Update Room
                    </button>
                    <button
                        className="w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition duration-200"
                        onClick={handleDelete}
                    >
                        Delete Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditRoomPage;
