import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const MakeComment = ({ postId, handleAddComment, username }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    handleAddComment(postId, newComment, username);
    setNewComment(''); // Clear the input field after submission
  };

  

  return (
    <div className="mt-5 borderCom">
      <textarea
        placeholder="Write your comment..."
        value={newComment}
        onChange={handleCommentChange}
        className="comment-input"
      />
      <Button className="mt-2" variant="primary" onClick={handleSubmitComment}>Post</Button>
    </div>
  );
};

export default MakeComment;
