// src/components/ArtistCard.jsx
import React from "react";

const ArtistCard = ({ image, name, description, downloadLink }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs text-center hover:shadow-xl transition duration-300">
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl uppercase mb-2">{name}</h2>
            
           
        </div>
    );
};

export default ArtistCard;
