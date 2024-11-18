import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../../../../Shared/Loader/Loader';

const UserDetails = () => {
  // Use Params To Get Url ID
  const params = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get User Details
  const getCourseDetails = async () => {
    try {
      const response = await axios.get(`https://veil-flicker-piano.glitch.me/users/${params.USERID}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
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
          {user?.name}
        </h1>
      </div>

      <div className="course-content">
        <h2>User Details</h2>
        <ul>
          <li>Email: <span style={{color: 'green'}}>{user.email}</span></li>
          <li>Age: <span style={{color: 'green'}}>{user.age}</span></li>
          <li>Password: <span style={{color: 'green'}}>{user.password}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
