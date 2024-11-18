import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../../../../Shared/Loader/Loader';

const UserDetails = () => {
  // Use Params To Get Url ID
  const params = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Student Details
  const getStudentDetails = async () => {
    try {
      const response = await axios.get(`https://veil-flicker-piano.glitch.me/students/${params.STUDENTID}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentDetails();
  }, [params]);

  // Render loader while loading
  if (loading) {
    return (
      <Loader />
    );
  }

  // Render Student details once loading is complete
  return (
    <div className="course-details">
      <div className="course-header">
        <h1>
          {student.name}
        </h1>
      </div>

      <div className="course-content">
        <h2>User Details</h2>
        <ul>
          <li>Email: <span style={{color: 'green'}}>{student.email}</span></li>
          <li>Gender: <span style={{color: 'green'}}>{student.gender}</span></li>
          <li>Age: <span style={{color: 'green'}}>{student.age}</span></li>
          <li>Course: <span style={{color: 'green'}}>{student.course}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
