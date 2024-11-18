import "./CourseDetails.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Buttons from "../../../../Shared/Styled-components/StyledComponents";
import Loader from '../../../../Shared/Loader/Loader';

const CourseDetails = () => {
  // Use Params To Get Url ID
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Course Details
  const getCourseDetails = async () => {
    try {
      const response = await axios.get(`https://veil-flicker-piano.glitch.me/courses/${params.COURSEID}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [params]);

  // Render loader while loading
  if (loading) {
    return (
      <Loader />
    );
  }

  // Render course details once loading is complete
  return (
    <div className="course-details">
      <div className="course-header">
        <h1>
          {course?.name} <Buttons.PrimarySpan>Course</Buttons.PrimarySpan>
        </h1>
        <p>Instructor: {course?.instructor}</p>
        <p>Duration: {course?.hours} Hours</p>
        <p>Course Difficulty: {course?.difficulty}</p>
      </div>

      <div className="course-content">
        <h2>Course Name</h2>
        <p>{course?.name}</p>

        <h2>Course Tools</h2>
        <ul>
          <li>We Will Use {course?.tools}</li>
        </ul>
      </div>

      <div className="course-footer">
        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseDetails;
