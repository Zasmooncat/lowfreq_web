// src/front/JS/components/TechnologyNews.jsx
import React, { useState, useEffect } from "react";

const API_KEY = "TU_API_KEY_AQUÍ"; // <-- reemplázala luego

const TechnologyNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=tecnología+robótica+internet+web+apps&lang=es&country=mx&token=${API_KEY}`
        );
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Últimas Noticias de Tecnología</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900 hover:bg-neutral-800 p-4 rounded-xl transition duration-300 shadow-lg"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm mt-2 line-clamp-2">{article.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TechnologyNews;
