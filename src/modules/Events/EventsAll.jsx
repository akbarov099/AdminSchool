import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { AiOutlineDelete } from "react-icons/ai";
import EventsSearch from "./EventsSearch"; 

export default function EventsAll() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await api.get("/blog");
      if (response.data.success) {
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data); 
      } else {
        setError("Failed to fetch blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await api.delete(`/blog/delete/${id}`);
      if (response.data.success) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        setFilteredBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== id)
        );
      } else {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
        <EventsSearch onSearch={handleSearch} /> 
      <div className="container">
        <div className="events-list">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => {
              const parsedBody = blog.body
                ? typeof blog.body === "string"
                  ? JSON.parse(blog.body)
                  : blog.body
                : {};

              return (
                <div key={blog._id} className="blog-item">
                  <img
                    src={parsedBody.image || "default-image.jpg"}
                    alt="Blog"
                  />
                  <p>{parsedBody.date || "No date available"}</p>
                  <h2>{blog.title}</h2>
                  <button onClick={() => handleDelete(blog._id)}>
                    <AiOutlineDelete />
                  </button>
                </div>
              );
            })
          ) : (
            <div>No blogs found for "{searchQuery}"</div>
          )}
        </div>
      </div>
    </section>
  );
}
