// src/components/CommentForm.tsx
import React, { useState } from "react";
import "../comment.css";

interface CommentFormProps {
  parentId: number;
  onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ parentId, onSubmit }) => {
  const [text, setText] = useState("");
  // const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formcomment">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="inputcomment"
      />
      <button type="submit" className="commentbtn">
        Reply
      </button>
    </form>
  );
};

export default CommentForm;
