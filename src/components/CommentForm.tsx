// src/components/CommentForm.tsx
import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Reply
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    Margintop: "10px",
    height: "20px",
    fontSize: "18px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CommentForm;
