// src/components/NewPostForm.tsx
import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface NewPostFormProps {
  onAddPost: (description: string, imageUrl: string) => void;
  handleClose: () => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({
  onAddPost,
  handleClose,
}) => {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && imageUrl.trim()) {
      onAddPost(description.trim(), imageUrl.trim());
      setDescription("");
      setImageUrl("");
      handleClose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="newpostform">
        <textarea
          placeholder="Enter post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="newpostinput"
          rows={3} // Adjust rows to control the height
          cols={50} // Optional: Adjust width
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="newpostinput"
        />
      </form>

      <div className="setmodalbtn">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </>
  );
};

export default NewPostForm;
