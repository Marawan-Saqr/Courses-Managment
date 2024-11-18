import "./TableDataUsers.css";
import Buttons from "../../../../Shared/Styled-components/StyledComponents";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../../Shared/Loader/Loader";
import { useNavigate } from "react-router-dom";

const TableDataUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "There was an error deleting the user.", "error");
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="courses-data pt-5 pb-5">
      <div className="container">
        <h2>
          ALL <Buttons.PrimarySpan>USERS</Buttons.PrimarySpan>
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>
                      <Buttons.DetailsButton style={{ margin: "5px 5px" }}>
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/system/users/user-details/${user.id}`}
                        >
                          Details
                        </Link>
                      </Buttons.DetailsButton>
                      <Buttons.UpdateButton
                        style={{ margin: "5px 5px" }}
                        onClick={() =>
                          navigate(`/system/users/update-user/${user.id}`, {
                            state: user,
                          })
                        }
                      >
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Update
                        </Link>
                      </Buttons.UpdateButton>
                      <Buttons.DeleteButton style={{ margin: "5px 5px" }}>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          onClick={() => {
                            handleDelete(user.id);
                          }}
                        >
                          Delete
                        </Link>
                      </Buttons.DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDataUsers;
