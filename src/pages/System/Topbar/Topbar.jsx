import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import Buttons from '../../../Shared/Styled-components/StyledComponents';
import './Topbar.css';

const Topbar = () => {

  // Get User Data From Local Storage
  const user = JSON.parse(localStorage.getItem("user-data"));

  // Remove Data From Local Storage When Logout
  const removeData = () => {
    localStorage.clear();
  }

  return (
    <Navbar style={{backgroundColor: 'rgb(84, 105, 212)'}} bg="rgb(84, 105, 212)" data-bs-theme="dark" expand="lg">
      <Container>
        <NavLink to={"/system"} className='navbar-brand'>Courses Management</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Courses" id="basic-nav-dropdown">
              <NavLink to={"courses/table-data"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>All Courses</NavLink>
              <NavLink to={"courses/add-course"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Add Course</NavLink>
            </NavDropdown>
            <NavDropdown title="Users">
              <NavLink to={"/system/users/table-data-users"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>All Users</NavLink>
              <NavLink to={"/system/users/create-user"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Create User</NavLink>
            </NavDropdown>
            <NavDropdown title="Students">
              <NavLink to={"/system/students/table-data-students"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>All Students</NavLink>
              <NavLink to={"/system/students/create-student"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Create Student</NavLink>
            </NavDropdown>
            <NavDropdown title="Filter">
              <NavLink to={"/system/filter/filter-by-difficulty"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Filter Courses By Difficulty</NavLink>
              <NavLink to={"/system/filter/enrolled-students"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Filter Enrolled Courses</NavLink>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link style={{color: '#fff', marginRight: '10px', fontStyle: 'italic', fontWeight: 'bold'}}>{user ? user.name : "Welcome User"}</Nav.Link>
            {user ? <Buttons.DeleteButton onClick={removeData}><NavLink to={"/login"} style={{color: '#fff', textDecoration: 'none'}}>Logout</NavLink></Buttons.DeleteButton> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;