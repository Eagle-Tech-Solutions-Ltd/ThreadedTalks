import React, { useState } from "react";
// import CommentForm from "./CommentForm.tsx";
import profileimg from "../assets/images/profile.png";

interface CommentProps {
  comment: {
    id: number;
    text: string;
    replies: any[];
  };
  addReply: (text: string, parentId: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, addReply }) => {
  const handleReplyClick = (text, id) => {
    addReply(text, id);
  };

  return (
    <div className="setalldiv">
      <div className="alignprobub">
        <div className="setprofileimg">
          <img src={profileimg} alt="profileimg" />
        </div>

        <div>
          <p className="username">User Name</p>
          <div className="chat-message">
            <p>{comment.text}</p>
          </div>
          <p
            onClick={() => {
              handleReplyClick(comment.text, comment.id);
            }}
            className="replyButton"
          >
            {"Reply"}
          </p>
        </div>
      </div>

      {/* Reply button toggles the form visibility */}

      {/* If there are replies, render them recursively */}
      {comment.replies?.length > 0 && (
        <div className="repliesContainer">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
