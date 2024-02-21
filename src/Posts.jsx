import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { fetchPosts, createComment } from './apiService';
import './Posts.css'
import Comments from './Comments';
import MakeComment from './makeComment';



const Posts = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [newComment, setNewComment] = useState('');
 const [showAlert, setShowAlert] = useState(false); 
  

  const handleViewComments = (postId) => {
    setCommentsVisibility({
      ...commentsVisibility,
      [postId]: !commentsVisibility[postId]
    });
  };

  

  const handleAddComment = async (postId, commentMessage) => {
  try {
    // Get the token from local storage
   

    // Call the createComment function with the postId, commentMessage, and token
    await createComment(postId, commentMessage, username, );

     // Set showAlert to true after successfully commenting
    setShowAlert(true);

    // Refresh posts data after adding the comment
    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
   
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};



  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
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
    <div className='background2'>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontSize: '48px' }}>Papillon Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-3">
              <Link to="/home" className="nav-link">Home</Link>
            <Link to="/posts" className="nav-link">Posts</Link>
              {/* Add more nav links as needed */}
            </Nav>
            <Nav className="ml-auto">
              <Navbar.Text className="me-3">Welcome, {username}</Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       {/* Alert to display success message */}
       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
          You have successfully commented on the post. Refresh site too see it!
        </Alert>
        </div>
      <Container>
        <h1 className='mt-4 text-white'>Posts Page</h1>
        {[...posts].reverse().map(post => (
          <div key={post._id} className='post-container mt-3'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="post-details">
              <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
              <div className="post-buttons">
                <Button variant="primary" onClick={() => handleViewComments(post._id)}>
                  {commentsVisibility[post._id] ? 'Hide Comments' : 'Add/View Comments'}
                </Button>
               
                
              </div>
            </div>
{commentsVisibility[post._id] && (
  <div className="make-comment-container">
    <MakeComment postId={post._id} handleAddComment={handleAddComment} username={username}  />
  </div>
)}
            {commentsVisibility[post._id] && (
              <div className="comments-container">
                <Comments postId={post._id} />
              </div>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
