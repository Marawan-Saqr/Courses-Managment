import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GetByLevel = () => {
  const { level } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch all courses
        const response = await axios.get("http://localhost:3001/courses");
        // Filter courses based on difficulty
        const filteredCourses = response.data.filter((course) => course.difficulty.toLowerCase() === level.toLowerCase());
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [level]);

  return (
    <div>
      <section className="course-data">
        <h3>Course Details - {level.charAt(0).toUpperCase() + level.slice(1)} Difficulty</h3>
        <ul>
          {courses.length > 0 ? (
            courses.map((course) => (
              <li key={course.id}>
                <div>Course Name: {course.name}</div>
                <div>Course Type: {course.type}</div>
                <div>Instructor: {course.instructor}</div>
                <div>Hours: {course.hours}</div>
                <div>Difficulty: {course.difficulty}</div>
                <div>Tools: {course.tools}</div>
              </li>
            ))
          ) : (
            <li>No courses found for this difficulty level</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default GetByLevel;
