
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './index.css'

const BlogHome = () => {
const navigate = useNavigate();
const [username, setUsername] = useState('');

useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      // Redirect to login if token is not found
      navigate('/');
    } else {
      // Decode token to access username
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    }
  }, [navigate]);

 const handleLogout = () => {
  // Clear the token from local storage (or cookies)
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <div className='background'>
   <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontSize: '48px' }}>Papillon Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-3">
              <Nav.Link to="/home">Home</Nav.Link>
              <Nav.Link to="/posts">Posts</Nav.Link>
              {/* Add more nav links as needed */}
            </Nav>
            <Nav className="ml-auto">
              <Navbar.Text className="me-3">Welcome, {username}</Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <div className="blog-content-container">
      <Container className="text-center">
        <h1 className="blog-content-title">Welcome {username} to My Blog!</h1>
        <p className="blog-content-text">
          Click on "Posts" above to see what's new on the blog, and feel free to drop some comments!
        </p>
      </Container>
    </div>

    </div>
  );
};

export default BlogHome;
