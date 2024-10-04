import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import HomeSearch from "./HomeSearch";
import useDarkModeStore from "../../Store/DarcModeStore";

export default function HomeAll() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    api
      .get("/teachers")
      .then((response) => {
        setTeachers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching teachers' data");
        setLoading(false);
      });
  }, []);

  const handleDelete = (teacherId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmDelete) {
      api
        .delete(`/teachers/delete/${teacherId}`)
        .then(() => {
          setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== teacherId));
          alert("Teacher deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting teacher:", error);
          alert("Failed to delete the teacher");
        });
    }
  };

  const filteredTeachers = teachers.filter((teacher) => 
    teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (teacher.subject && teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredTeachers.length === 0) {
    return <div>No teachers found</div>;
  }

  return (
    <section className="home__all">
        <HomeSearch onSearch={setSearchQuery} />
      <div className="container">
        <div  className={`${darkMode ? "home__all__list-light" : "home__all__list-dark"}`}>
          {filteredTeachers.map((teacher) => (
            <div key={teacher._id} className="teachers__card">
              <div
                className="teachers__image"
                onClick={() => {
                  if (teacher.resume) {
                    window.open(teacher.resume, "_blank");
                  } else {
                    alert("PDF файл не найден.");
                  }
                }}
              >
                <img
                  src={teacher.image || ""}
                  alt={teacher.full_name || "Имя не указано"}
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
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
