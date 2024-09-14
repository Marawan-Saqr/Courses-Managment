import "./TableData.css";
import Buttons from '../../../../Shared/StyledComponents';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TableData = () => {

  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="courses-data pt-5 pb-5">
      <div className="container">
        <h2>All <Buttons.PrimarySpan>Courses</Buttons.PrimarySpan></h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Type</th>
              <th>Instructor</th>
              <th>Hours</th>
              <th>Difficulty</th>
              <th>Tools</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              // Define style based on difficulty
              const difficultyStyle = (() => {
                const difficulty = course.difficulty.toLowerCase();
                if (difficulty.includes('easy')) return { color: 'rgb(36, 169, 67)' };
                if (difficulty.includes('hard')) return { color: 'rgb(204, 0, 0)' };
                return { color: '#e0e02d' };
              })();

              return (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.type}</td>
                  <td>{course.instructor}</td>
                  <td>{course.hours}</td>
                  <td style={difficultyStyle}>{course.difficulty}</td>
                  <td>{course.tools}</td>
                  <td>
                    <Buttons.DetailsButton>Details</Buttons.DetailsButton>
                    <Buttons.UpdateButton style={{ margin: '0px 10px' }}>Update</Buttons.UpdateButton>
                    <Buttons.DeleteButton>Delete</Buttons.DeleteButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableData;
