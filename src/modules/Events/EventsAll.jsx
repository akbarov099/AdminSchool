import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance"; // Assuming you have axios instance set up

export default function EventsAll() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blogs when component is mounted
  useEffect(() => {
    api
      .get("/blog")
      .then((response) => {
        console.log("Response data:", response.data);
        setBlogs(response.data); // Assuming response.data is an array of blogs
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <div className="container">
        <h1>All Events</h1>
        <div className="events-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="event-card">
                <h2>{blog.title}</h2>
                <p>{blog.body?.description || "No description available"}</p>
                {blog.body?.image && (
                  <img
                    src={blog.body.image}
                    alt={blog.title}
                    className="event-image"
                  />
                )}
                <small>Created at: {new Date(blog.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </section>
  );
}
