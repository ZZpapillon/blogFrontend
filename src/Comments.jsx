import React, { useEffect, useState } from 'react';
import { fetchComments } from './apiService';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allComments = await fetchComments();
        setComments(allComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, []);

  // Filter comments for the current post
  const postComments = comments.filter(comment => comment.postId === postId);

  return (
    <div className="comments-container">
      
      {postComments.length > 0 ? (
        postComments.reverse().map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-created-at">
                Created At: {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="comment-message">{comment.message}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comments;

