import "./TableData.css";
import Buttons from '../../../../Shared/Styled-components/StyledComponents';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

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

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/courses/${id}`);
        // Remove the deleted course from the state
        setCourses(courses.filter(course => course.id !== id));
        // Show success notification
        Swal.fire(
          'Deleted!',
          'The course has been deleted.',
          'success'
        );
      } catch (error) {
        console.error("Error deleting course:", error);
        // Show error notification
        Swal.fire(
          'Error!',
          'There was an error deleting the course.',
          'error'
        );
      }
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
                    <Buttons.DetailsButton>
                      <Link style={{ color: 'black', textDecoration: 'none' }} to={`/system/courses/details/${course.id}`}>Details</Link>
                    </Buttons.DetailsButton>
                    <Buttons.UpdateButton style={{ margin: '0px 10px' }}>
                      <Link style={{ color: 'white', textDecoration: 'none' }} to={{ pathname: `/system/courses/update/${course.id}`, state: course }}>Update</Link>
                    </Buttons.UpdateButton>
                    <Buttons.DeleteButton>
                      <Link
                        style={{ color: 'white', textDecoration: 'none' }}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the default link behavior
                          handleDelete(course.id);
                        }}
                      >
                        Delete
                      </Link>
                    </Buttons.DeleteButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;
