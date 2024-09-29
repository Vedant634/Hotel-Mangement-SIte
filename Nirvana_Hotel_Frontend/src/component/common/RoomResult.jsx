import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RoomResult = ({ roomSearchResults }) => {
    const apiService = ApiService();
    const navigate = useNavigate();
    const isAdmin = apiService.isAdmin();

    return (
        <section className="room-results p-8 bg-gray-50">
            {roomSearchResults && roomSearchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {roomSearchResults.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
                        >
                            <img
                                className="w-full h-48 object-cover"
                                src={room.roomPhotoUrl}
                                alt={room.roomType}
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-3">
                                    {room.roomType}
                                </h3>
                                <p className="text-lg text-gray-500 mb-2">
                                    <span className="font-semibold">Price: </span>${room.roomPrice} / night
                                </p>
                                <p className="text-gray-600 mb-4">{room.roomDescription}</p>
                                <div className="flex justify-between items-center">
                                    {isAdmin ? (
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                                            onClick={() =>
                                                navigate(`/admin/edit-room/${room.id}`)
                                            }
                                        >
                                            Edit Room
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                            onClick={() =>
                                                navigate(`/room-details-book/${room.id}`)
                                            }
                                        >
                                            View/Book Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No rooms found.</p>
            )}
        </section>
    );
};

export default RoomResult;
