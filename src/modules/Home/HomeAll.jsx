import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/axiosInstance";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import HomeSearch from "./HomeSearch";
import useDarkModeStore from "../../Store/DarcModeStore";

export default function HomeAll({ formData, setFormData }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers");
        setTeachers(response.data.data);
      } catch (error) {
        setError("Error fetching teachers' data");
        console.error("Fetch error:", error); 
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [formData]);

  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/teachers/delete/${teacherId}`);
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== teacherId)
        );
        alert("Teacher deleted successfully");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        alert("Failed to delete the teacher");
      }
    }
  };

  const filteredTeachers = useMemo(
    () =>
      teachers.filter(
        (teacher) =>
          teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (teacher.subject &&
            teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [teachers, searchQuery]
  );

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="home__all">
      <HomeSearch onSearch={setSearchQuery} />
      <div className="container">
        <div
          className={`${
            darkMode ? "home__all__list-light" : "home__all__list-dark"
          }`}
        >
          {filteredTeachers.length === 0 ? (
            <div>No teachers found</div>
          ) : (
            filteredTeachers.map((teacher) => (
              <div key={teacher._id} className="teachers__card">
                <div
                  className="teachers__image"
                  onClick={() => {
                    if (teacher.resume) {
                      window.open(teacher.resume, "_blank");
                    } else {
                      alert("PDF file not found.");
                    }
                  }}
                >
                  <img
                    src={teacher.image || ""}
                    alt={teacher.full_name || "Name not specified"}
                  />
                  <GrContactInfo className="whatsapp-icon" size={40} />
                </div>
                <div className="teachers__info">
                  <h3>{teacher.full_name}</h3>
                  {teacher.subject && <p>{teacher.subject}</p>}
                </div>
                <button
                  className="teachers__delete"
                  onClick={() => handleDelete(teacher._id)}
                  aria-label={`Delete ${teacher.full_name}`}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
