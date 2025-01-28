import React, { useState } from "react";
import CommentForm from "./CommentForm.tsx";
import "../comment.css";
import profileimg from "../assets/images/1.png";

interface CommentProps {
  comment: {
    id: number;
    text: string;
    replies: any[];
  };
  addReply: (text: string, parentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, addReply }) => {
  const [showReply, setShowReply] = useState(false);

  const handleReplyClick = () => {
    setShowReply(!showReply); 
  };

  return (
    <div className="setalldiv">
      <div className="alignprobub">
        <div className="setprofileimg">
          <img src={profileimg} alt="profileimg" />
        </div>
        <div className="chat-message">
          <p>{comment.text}</p>
        </div>
      </div>

      {/* Reply button toggles the form visibility */}
      <div>
        <p onClick={handleReplyClick} className="replyButton">
          {showReply ? "Cancel" : "Reply"} 
        </p>
      </div>

      {/* Render CommentForm if showReplyForm is true */}
      {/* {showReplyForm && (
        <CommentForm
          parentId={comment.id}
          onSubmit={(text) => addReply(text, comment.id)}
        />
      )} */}

      {/* If there are replies, render them recursively */}
      {comment.replies?.length > 0 && (
        <div style={styles.repliesContainer}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  repliesContainer: {
    marginTop: "10px",
    paddingLeft: "20px",
  },
};

export default Comment;
