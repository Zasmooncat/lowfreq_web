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
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-500 transition"
            >
                Descargar Rider
            </a>
        </div>
    );
};

export default ArtistCard;
