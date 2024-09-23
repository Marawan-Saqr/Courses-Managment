import "./GetByLevel.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Buttons from '../../../../../Shared/Styled-components/StyledComponents';
import { Link } from 'react-router-dom';
import Loader from '../../../../../Shared/Loader/Loader';

const GetByLevel = () => {
  const { level } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setCourses(
        response.data.filter(
          (course) => course.difficulty.toLowerCase() === level.toLowerCase()
        )
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Stop the loader after fetching data
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [level]);

  // Function to determine the style based on the level
  const getDifficultyStyle = (difficulty) => {
    const difficultyLower = difficulty.toLowerCase();
    if (difficultyLower.includes('easy')) return { color: 'rgb(36, 169, 67)' };
    if (difficultyLower.includes('hard')) return { color: 'rgb(204, 0, 0)' };
    return { color: '#e0e02d' };
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <section className="course-data">
          <div className="container">
            <h3 className="text-center" style={getDifficultyStyle(level)}>
              COURSE DETAILS - {level.toUpperCase()} DIFFICULTY
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
                        <strong>Difficulty:</strong>{" "}
                        <span style={getDifficultyStyle(course.difficulty)}>
                          {course.difficulty}
                        </span>
                      </div>
                      <div>
                        <strong>Tools:</strong> {course.tools}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Buttons.DetailsButton style={{ marginTop: '20px' }}>
                          <Link style={{color: 'black', textDecoration: 'none'}} to={`/system/courses/details/${course.id}`}>Details</Link>
                        </Buttons.DetailsButton>
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
      )}
    </div>
  );
};

export default GetByLevel;
