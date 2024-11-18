import './EnrolledStudents.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';


const EnrolledStudents = () => {

  // Get All Difficulties
  const [courseNames, setCourseNames] = useState([]);
  const getAllCoursesNames = async () => {
    await axios.get("https://veil-flicker-piano.glitch.me/courses").then((response) => setCourseNames(response.data));
  }

  useEffect(() => {
    getAllCoursesNames();
  }, [])

  // Easy Courses Difficulty By Default
  const location = useLocation();
  if (location.pathname === '/system/filter/enrolled-students') {
    return <Navigate to="HTML New Level 2" />;
  }

  return (
    <div className='difficult-dashboard'>
      <div className="container">
      <h4>Click On Course To Show Enrolled Students</h4>
      </div>
      <div className="row justify-content-between">
        <div className='col-md-4'>
          <div className="nav-wrap">
            <nav className="main-nav" role="navigation">
              <ul className="unstyled list-hover-slide">
                {courseNames.map((course) => (
                  <li key={course.id}><Link style={{textTransform: 'uppercase', color: 'black'}} to={`${course.name}`}>{course.name}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className='col-md-12 mt-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default EnrolledStudents;
