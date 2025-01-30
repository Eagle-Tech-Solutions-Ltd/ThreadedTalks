// src/components/CommentForm.tsx
import React, { useState } from "react";

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
  // const [showPicker, setShowPicker] = useState(false);
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
        <>
          <div className="aligncancel ">
            <div className="chat-message">
              <p className="usercommenttext">{parentText}</p>
            </div>
            <p
              className="commentbtn text-end mb-0"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </p>
          </div>

        </>
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
        <button type="submit" className="replaybtn">
          Reply
        </button>
      </form>
    </>
  );
};

export default CommentForm;
