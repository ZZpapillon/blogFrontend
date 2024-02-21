import axios from 'axios';

const baseURL = 'https://blog-ippj.onrender.com/api'; // Replace with your backend URL

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, userData);
        const { token } = response.data; // Extract the token from the response
        localStorage.setItem('token', token); // Store the token in local storage
        return token; // Return the token

    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/login`, userData);
       const { token } = response.data; // Extract the token from the response
        localStorage.setItem('token', token); // Store the token in local storage
        return token; // Return the token

    } catch (error) {
        throw error.response.data;
    }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${baseURL}/posts`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchComments = async () => {
  try {
    const response = await axios.get(`${baseURL}/comments`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createComment = async (postId, commentMessage, authorUsername) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${baseURL}/posts/${postId}/comments`,
      {  message: commentMessage, author: authorUsername }, // Include author
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



