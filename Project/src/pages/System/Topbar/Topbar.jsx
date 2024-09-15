import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Buttons from '../../../Shared/Styled-components/StyledComponents';


const Topbar = () => {

  // Get User Data From Local Storage
  const user = JSON.parse(localStorage.getItem("user-data"));

  const removeData = () => {
    localStorage.clear();
  }

  return (
    <Navbar style={{backgroundColor: 'rgb(84, 105, 212)'}} bg="rgb(84, 105, 212)" data-bs-theme="dark" expand="lg">
      <Container>
        <Link to={"/system"} className='navbar-brand'>Courses Management</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Courses" id="basic-nav-dropdown">
              <Link to={"courses/table-data"} className="nav-link">All Courses</Link>
              <Link to={"courses/difficult"} className='nav-link'>Filter Courses By Difficulty</Link>
            </NavDropdown>
            <Link to={"add"} className='nav-link'>Add Course</Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link style={{color: '#fff', marginRight: '10px', fontStyle: 'italic', fontWeight: 'bold'}}>{user ? user.name : "Welcome User"}</Nav.Link>
            {user ? <Buttons.DeleteButton onClick={removeData}><Link to={"/login"} style={{color: '#fff', textDecoration: 'none'}}>Logout</Link></Buttons.DeleteButton> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;