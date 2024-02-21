import React, { useState } from 'react';
import { Container, Button, Row, Col, Form, Navbar } from 'react-bootstrap';
import { registerUser, loginUser } from './apiService'
import { useNavigate } from 'react-router-dom';
function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
    const [error, setError] = useState(null);
     const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            };
            await registerUser(userData);
            // Handle successful registration (e.g., show success message)
            navigate('/home');
        } catch (error) {
            // Handle registration error (e.g., display error message)
            alert(error.message || 'Registration failed. Please try again.');
        }
    };
    

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                email: e.target.email.value,
                password: e.target.password.value
            };
            const response = await loginUser(userData);
          
            navigate('/home');
            // Handle successful login (e.g., store JWT token, redirect user)
        } catch (error) {
            // Handle login error (e.g., display error message)
             alert(error.message || 'Login failed. Please try again.');
        }
    };

  return (
    <div style={{ background: '#343a40', minHeight: '100vh', }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand style={{ fontSize: '48px' }}>Papillon Blog</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <div className="text-center mb-3">
              <Button variant="primary" onClick={handleSignUpClick} style={{ fontSize: '24px', width: '200px', height: '60px', marginBottom: '7vh' }}>Sign Up</Button>{' '}
              <Button variant="secondary" onClick={handleSignInClick} style={{ fontSize: '24px', width: '200px', height: '60px', marginBottom: '7vh' }}>Sign In</Button>
            </div>
            {isSignUp && (
              <Form className='text-white' onSubmit={handleSubmitSignUp}>
                <Form.Group className="mb-3 " controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                {error && <div>{error}</div>}
                <Button  variant="primary" type="submit" style={{ width: '100%', marginTop: '2vh' }}>Sign Up</Button>
              </Form>
            )}
            {isSignIn && (
              <Form className='text-white' onSubmit={handleSubmitSignIn}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                {error && <div>{error}</div>}
                <Button  variant="primary" type="submit" style={{ width: '100%', marginTop: '2vh' }}>Sign In</Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
