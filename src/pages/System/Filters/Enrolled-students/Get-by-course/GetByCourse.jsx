import "./GetByCourse.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Buttons from "../../../../../Shared/Styled-components/StyledComponents";
import { Link } from "react-router-dom";
import Loader from "../../../../../Shared/Loader/Loader";

const GetByCourse = () => {
  const { name } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/students?course=${name}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to load students. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <section className="student-data">
          <div className="container">
            <h3 className="text-center">STUDENT DETAILS FOR COURSE:</h3>
            <div className="row">
              {students.length > 0 ? (
                students.map((student) => (
                  <div className="col-md-12 mb-4 mt-4" key={student.id}>
                    <div className="student-box">
                      <div>
                        <strong>Student Name:</strong> {student.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {student.email}
                      </div>
                      <div>
                        <strong>Age:</strong> {student.age}
                      </div>
                      <div>
                        <strong>Gender:</strong> {student.gender}
                      </div>
                      <div>
                        <strong>Course:</strong> {student.course}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <Buttons.DetailsButton style={{ marginTop: "20px" }}>
                          <Link
                            style={{ color: "black", textDecoration: "none" }}
                            to={`/system/students/student-details/${student.id}`}
                          >
                            Details
                          </Link>
                        </Buttons.DetailsButton>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div>No students found for this course</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GetByCourse;
