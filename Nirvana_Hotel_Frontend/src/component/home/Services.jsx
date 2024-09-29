import { motion } from 'framer-motion';
import React from 'react';

import acIcon from "../../assets/images/pexels-pixabay-258154.jpg";
import barIcon from "../../assets/images/Bar.jpeg";
import parkingIcon from "../../assets/images/pexels-pixabay-258154.jpg";
import poolIcon from "../../assets/images/Fairmont Scottsdale Princess - Princess Pool - 1418711.webp";
import wifiIcon from "../../assets/images/pexels-pixabay-258154.jpg";
import gymIcon from "../../assets/images/Best-hotel-gyms-Aria-Technogym.webp";
import spaIcon from "../../assets/images/Spa.jpeg";
import eventIcon from "../../assets/images/Event.jpeg";
import restaurantIcon from "../../assets/images/Restaurant.jpeg";
import roomServiceIcon from "../../assets/images/pexels-pixabay-258154.jpg";


const services = [
  
  {
    icon: barIcon,
    title: "Bar",
    description: "Enjoy complimentary beverages and snacks in your room's mini bar."
  },
  
  {
    icon: poolIcon,
    title: "Swimming Pool",
    description: "Relax and unwind at our outdoor swimming pool, open year-round."
  },
  {
    icon: gymIcon,
    title: "Gym",
    description: "Stay fit during your stay with our fully equipped fitness center."
  },
  {
    icon: spaIcon,
    title: "Spa Services",
    description: "Indulge in rejuvenating spa treatments and wellness therapies."
  },
  {
    icon: restaurantIcon,
    title: "On-Site Restaurant",
    description: "Dine in style at our gourmet restaurant, offering a diverse menu."
  },
  
  {
    icon: eventIcon,
    title: "Event Space",
    description: "Host memorable events in our versatile meeting and banquet facilities."
  },
];

const Services = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="w-full max-w-screen-xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8">Hotel Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg mx-4" // Added margin here
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <img src={service.icon} alt={service.title} className="w-48 h-40 mb-4 object-cover rounded-md" />

              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
