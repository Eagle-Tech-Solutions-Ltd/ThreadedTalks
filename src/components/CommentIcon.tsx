// src/components/CommentIcon.tsx
import React from 'react';

interface CommentIconProps {
  onClick: () => void;
}

const CommentIcon: React.FC<CommentIconProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} style={styles.icon}>
      💬 Comment
    </div>
  );
};

const styles = {
  icon: {
    cursor: 'pointer',
    color: '#007BFF',
    fontSize: '18px',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default CommentIcon;
