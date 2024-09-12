import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import StyledButton from '../../../Shared/StyledComponents';

const Topbar = () => {

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
            <Link to={"courses"} className="nav-link">All Courses</Link>
            <Nav.Link href="#features">Add Course</Nav.Link>
            <Nav.Link href="#home">All Users</Nav.Link>
            <Nav.Link href="#features">Add User</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link style={{color: '#fff', marginRight: '10px', fontStyle: 'italic', fontWeight: 'bold'}}>{user ? user.name : "Welcome User"}</Nav.Link>
            {user ? <StyledButton onClick={removeData}><Link to={"/login"} style={{color: '#fff', textDecoration: 'none'}}>Logout</Link></StyledButton> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
