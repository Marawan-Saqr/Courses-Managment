import "./GetByLevel.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GetByLevel = () => {
  const { level } = useParams();
  const [courses, setCourses] = useState([]);

  // Fetch courses based on difficulty level
  const fetchCourses = async () => {
    await axios
      .get("http://localhost:3001/courses")
      .then((response) =>
        setCourses(
          response.data.filter(
            (course) => course.difficulty.toLowerCase() === level.toLowerCase()
          )
        )
      );
  };

  useEffect(() => {
    fetchCourses();
  }, [level]);

  return (
    <div>
      <section className="course-data">
        <div className="container">
          <h3 className="text-center">
            Course Details - {level.charAt(0).toUpperCase() + level.slice(1)}{" "}
            Difficulty
          </h3>
          <div className="row">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="col-md-12 mb-4 mt-4" key={course.id}>
                  <div className="course-box">
                    <div>
                      <strong>Course Name:</strong> {course.name}
                    </div>
                    <div>
                      <strong>Course Type:</strong> {course.type}
                    </div>
                    <div>
                      <strong>Instructor:</strong> {course.instructor}
                    </div>
                    <div>
                      <strong>Hours:</strong> {course.hours}
                    </div>
                    <div>
                      <strong>Difficulty:</strong> {course.difficulty}
                    </div>
                    <div>
                      <strong>Tools:</strong> {course.tools}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div>No courses found for this difficulty level</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetByLevel;
