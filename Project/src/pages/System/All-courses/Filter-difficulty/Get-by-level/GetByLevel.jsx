import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GetByLevel = () => {
  const params = useParams();
  console.log(params);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/${params.level}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [params.level]);

  return (
    <div>
      <section className="course-data">
        <h3>Course Details</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <div>Course Name: {course.name}</div>
              <div>Course Type: {course.type}</div>
              <div>Instructor: {course.instructor}</div>
              <div>Hours: {course.hours}</div>
              <div>Difficulty: {course.difficulty}</div>
              <div>Tools: {course.tools}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default GetByLevel;
