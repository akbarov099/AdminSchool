import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance"; 

export default function EventsAll() {
  const [blogs, setBlogs] = useState([]); // Массив для хранения блогов
  const [loading, setLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(null); // Сообщение об ошибке

  useEffect(() => {
    api
      .get("/blog")
      .then((response) => {
        // Извлекаем данные из ответа
        if (response.data.success) {
          setBlogs(response.data.data); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // Показать загрузку
  if (error) return <div>{error}</div>; // Показать ошибку

  return (
    <section>
      <div className="container">
        <h1>All Events</h1>
        <div className="events-list">
          {blogs.map((blog, index) => {
            let parsedBody;

            try {
              parsedBody = blog.body ? JSON.parse(blog.body) : {};
            } catch (error) {
              parsedBody = {};
            }

            return (
              <div key={index} className="blog-item">
                <h2>{blog.title}</h2> {/* Заголовок блога */}
                <img src={parsedBody.image} alt="Blog" style={{ width: '100px', height: '100px' }} /> {/* Изображение блога */}
                <p>{parsedBody.date}</p> {/* Дата блога, если есть */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
