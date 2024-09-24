import './TableDataStudents.css';
import Buttons from '../../../../Shared/Styled-components/StyledComponents';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../../../Shared/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const TableDataStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
        await axios.delete(`http://localhost:3001/students/${id}`);
        setStudents(students.filter(student => student.id !== id));
        Swal.fire('Deleted!', 'The student has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire('Error!', 'There was an error deleting the student.', 'error');
      }
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="courses-data pt-5 pb-5">
      <div className="container">
        <h2>ALL <Buttons.PrimarySpan>STUDENTS</Buttons.PrimarySpan></h2>

        {loading ? (
          <Loader />
        ) : (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.email}</td>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td>
                    <Buttons.DetailsButton>
                      <Link style={{color: 'black', textDecoration: 'none'}} to={`/system/students/student-details/${student.id}`}>Details</Link>
                    </Buttons.DetailsButton>
                    <Buttons.UpdateButton style={{ margin: '0px 10px' }} onClick={() => navigate(`/system/students/update-student/${student.id}`, { state: student })}>
                      <Link style={{ color: 'white', textDecoration: 'none' }} >Update</Link>
                    </Buttons.UpdateButton>
                    <Buttons.DeleteButton>
                      <Link style={{ color: 'white', textDecoration: 'none' }} onClick={() => {handleDelete(student.id)}}>Delete</Link>
                    </Buttons.DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TableDataStudents;