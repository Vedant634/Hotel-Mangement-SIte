import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

function AdminPage() {
    const apiService = ApiService();
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await apiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error Fetching admin Details', error.message);
            }
        };
        fetchAdmin();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-28"> {/* Changed to justify-start and added padding */}
            <h1 className="text-4xl font-bold mb-12 text-center">Welcome, {adminName}</h1> {/* Reduced margin below the heading */}
            <div className="flex flex-col space-y-14"> {/* Adjusted gap between buttons */}
                <button
                    className="w-[400px] h-[130px] bg-amber-500 text-white text-2xl font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
                    onClick={() => navigate('/admin/manage-rooms')}
                >
                    Manage Rooms
                </button>
                <button
                    className="w-[400px] h-[130px] bg-amber-500 text-white text-2xl font-semibold rounded-md shadow-md transition-transform transform hover:scale-105"
                    onClick={() => navigate('/admin/manage-bookings')}
                >
                    Manage Bookings
                </button>
            </div>
        </div>
    );
}

export default AdminPage;
