import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function AddRoom() {
   const navigate = useNavigate()
   const apiService = ApiService()
   const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: '',
    roomType: '',
    roomPrice: '',
    roomDescription: '',
})
const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
const [roomTypes, setRoomTypes] = useState([])
const [newRoomType, setNewRoomType] = useState(false)

useEffect(() => {
    const fetchRoomTypes = async () => {
        try {
            const types = await apiService.getRoomTypes()
            setRoomTypes(types);
        } catch (error) {
            console.error('Error fetching room types:', error.message)
        }
    }
    fetchRoomTypes()
}, [])

const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prevState => ({
        ...prevState,
        [name]: value,
    }))
}

const handleRoomTypeChange = (e) => {
    if (e.target.value === 'new') {
        setNewRoomType(true);
        setRoomDetails(prevState => ({ ...prevState, roomType: '' }))
    } else {
        setNewRoomType(false);
        setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }))
    }
}

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    } else {
        setFile(null);
        setPreview(null);
    }
}

    const addRoom = async()=>{
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('All room details must be provided.')
            setTimeout(() => setError(''), 5000)
            return
        }
        if (!window.confirm('Do you want to add this room?')) {
            return
        }


        try {
            const formData = new FormData()
            formData.append('roomType', roomDetails.roomType)
            formData.append('roomPrice', roomDetails.roomPrice)
            formData.append('roomDescription', roomDetails.roomDescription)

            if (file) {
                formData.append('photo', file)
            }

            const result = await apiService.addRoom(formData)
            if (result.statusCode === 200) {
                setSuccess('Room Added successfully.')
                
                setTimeout(() => {
                    setSuccess('')
                    navigate('/admin/manage-rooms')
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message)
            setTimeout(() => setError(''), 5000)
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-300 p-5">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Add New Room</h2>
            {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}
            {success && <p className="text-green-600 mb-4 font-semibold">{success}</p>}
            
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-[800px] border border-gray-200">
                <div className="form-group mb-6">
                    {preview && (
                        <img src={preview} alt="Room Preview" className="mb-4 rounded-md w-full max-w-[600px] h-60 object-cover border border-gray-300 shadow" />
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                        className="block w-full border border-gray-300 rounded-md p-3 transition duration-200 focus:border-blue-500 focus:outline-none"
                    />
                </div>
    
                <div className="form-group mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Room Type</label>
                    <select 
                        value={roomDetails.roomType} 
                        onChange={handleRoomTypeChange}
                        className="block w-full border border-gray-300 rounded-md p-3 transition duration-200 focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Select a room type</option>
                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newRoomType && (
                        <input
                            type="text"
                            name="roomType"
                            placeholder="Enter new room type"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                            className="mt-2 block w-full border border-gray-300 rounded-md p-3 transition duration-200 focus:border-blue-500 focus:outline-none"
                        />
                    )}
                </div>
                <div className="form-group mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-3 transition duration-200 focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="form-group mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-3 transition duration-200 focus:border-blue-500 focus:outline-none h-32"
                    ></textarea>
                </div>
                <button 
                    className="bg-amber-500 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-amber-600 transition duration-300 transform hover:scale-105"
                    onClick={addRoom}
                >
                    Add Room
                </button>
            </div>
        </div>
    );
    
    
    

}

export default AddRoom