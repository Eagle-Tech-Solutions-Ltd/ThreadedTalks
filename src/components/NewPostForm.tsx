// src/components/NewPostForm.tsx
import React, { useState } from "react";
import "../comment.css";

interface NewPostFormProps {
  onAddPost: (description: string, imageUrl: string) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && imageUrl.trim()) {
      onAddPost(description.trim(), imageUrl.trim()); 
      setDescription("");
      setImageUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newpostform">
      <input
        type="text"
        placeholder="Enter post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="newpostinput"
      />
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="newpostinput"
      />
    </form>
  );
};

export default NewPostForm;
