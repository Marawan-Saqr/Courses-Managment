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
              <NavLink to={"courses/difficult"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Filter Courses By Difficulty</NavLink>
            </NavDropdown>
            <NavLink to={"add"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Add Course</NavLink>
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