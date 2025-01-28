// src/components/CommentIcon.tsx
import React from 'react';

interface CommentIconProps {
  onClick: () => void;
}

const CommentIcon: React.FC<CommentIconProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='commenticon'>
      💬 Comment
    </div>
  );
};

export default CommentIcon;
