import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import { motion } from 'framer-motion';
import photo from "../../assets/images/pexels-pixabay-258154.jpg"; 

import Services from "./Services";

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  return (
    <div className="home">
      <header className="header-banner">
        <div 
          className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center" 
          style={{ backgroundImage: `url(${photo})` }} 
        >
          <motion.div 
  className="text-center text-white"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 3 }} 
>
  <h1 className="text-7xl text-amber-500 font-bold">Nirvana Hotel</h1>
  <p className="text-3xl mt-12">Step into a heaven of comfort</p>
</motion.div>

        </div>
      </header>

      
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* <RoomSearch handleSearchResult={handleSearchResult} />
        <RoomResult roomSearchResults={roomSearchResults} /> */}

       
        <Services />
      </div>
    </div>
  );
}

export default HomePage;
