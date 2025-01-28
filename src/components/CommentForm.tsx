// src/components/CommentForm.tsx
import React, { useState } from "react";
import "../comment.css";

interface CommentFormProps {
  parentId: number;
  parentText: String;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  parentText,
  onSubmit,
  onCancel,
}) => {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <>
      {parentText ? (
        <div className="d-flex">
          <p>{parentText}</p>
          <button
            type="submit"
            className="commentbtn"
            onClick={() => {
              onCancel();
            }}
          >
            cancel
          </button>
        </div>
      ) : (
        <></>
      )}
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
    </>
  );
};

export default CommentForm;
