import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2024 Nirvana Hotel. All rights reserved.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Sign up for Newsletter"
              className="px-4 py-2 rounded-l bg-white text-gray-800"
            />
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-r hover:bg-yellow-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
