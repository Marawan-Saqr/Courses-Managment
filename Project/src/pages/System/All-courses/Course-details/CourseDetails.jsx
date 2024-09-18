import "./CourseDetails.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Buttons from "../../../../Shared/Styled-components/StyledComponents";

const CourseDetails = () => {
  // Use Params To Get Url ID
  const params = useParams();
  const [course, setCourse] = useState([]);

  // Get All Courses
  const getAllCourses = async () => {
    await axios.get(`http://localhost:3001/courses/${params.CourseID}`).then((response) => setCourse(response.data));
  }

  useEffect(() => {
    getAllCourses();
  }, [params]);

  return (
    <div className="course-details">
      <div className="course-header">
        <h1>
          {course.name} <Buttons.PrimarySpan>Course</Buttons.PrimarySpan>
        </h1>
        <p>Instructor: {course.instructor}</p>
        <p>Duration: {course.hours} Hours</p>
        <p>Course Difficulty: {course.difficulty}</p>
      </div>

      <div className="course-content">
        <h2>About this Course</h2>
        <p>{course.about}</p>

        <h2>What you'll learn</h2>
        <ul>
          <li>{course.learn}</li>
        </ul>

        <h2>Course Syllabus</h2>
        <ul style={{listStyleType: 'none'}}>
          {course.Syllabus ? (
            course.Syllabus.split("\n").map((topic, index) => (
              <li key={index}>{topic}</li>
            ))
          ) : (
            <li>No syllabus available</li>
          )}
        </ul>

        <h2>Course Tools</h2>
        <ul>
          <li>We Will Use {course.tools}</li>
        </ul>
      </div>

      <div className="course-footer">
        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseDetails;
