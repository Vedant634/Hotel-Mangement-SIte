import React from 'react';

function Pagination({ roomsPerPage, totalRooms, currentPage, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 rounded-md text-lg font-semibold transition-colors duration-200 ${
                                currentPage === number
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-amber-500 hover:text-white'
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
