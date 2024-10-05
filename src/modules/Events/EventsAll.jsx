
// EventsAll.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { AiOutlineDelete } from "react-icons/ai";
import EventsSearch from "./EventsSearch";
import useDarkModeStore from "../../Store/DarcModeStore";

export default function EventsAll() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkModeStore();
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog");
        if (response.data.success) {
          setBlogs(response.data.data);
          setFilteredBlogs(response.data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (error) {
        setError("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await api.delete(`/blog/delete/${id}`);
        if (response.data.success) {
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
          setFilteredBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== id)
          );
        } else {
          setError("Failed to delete blog. Please try again.");
        }
      } catch (error) {
        setError("Failed to delete blog. Please try again.");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <EventsSearch onSearch={handleSearch} />
      <div className="container">
        <div
          className={`${darkMode ? "events-list-light" : "events-list-dark"}`}
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => {
              const parsedBody = blog.body
                ? typeof blog.body === "string"
                  ? JSON.parse(blog.body)
                  : blog.body
                : {};

              return (
                <div key={blog._id} className="blog-item">
                  <img src={parsedBody.image} alt={blog.title} />
                  <h3>{blog.title}</h3>
                  <p>{parsedBody.date}</p>
                  <button onClick={() => handleDelete(blog._id)}>
                    <AiOutlineDelete />
                  </button>
                </div>
              );
            })
          ) : (
            <div>No blogs found</div>
          )}
        </div>
      </div>
    </section>
  );
}