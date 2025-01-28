// src/components/NewPostForm.tsx
import React, { useState } from 'react';

interface NewPostFormProps {
  onAddPost: (description: string, imageUrl: string) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && imageUrl.trim()) {
      onAddPost(description.trim(), imageUrl.trim()); // Add the new post
      setDescription('');
      setImageUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Enter post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Post</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '800px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NewPostForm;
