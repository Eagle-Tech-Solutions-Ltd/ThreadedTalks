// src/components/CommentList.tsx
import React from 'react';
import Comment from './Comment.tsx';

interface CommentListProps {
  comments: { id: number; text: string; replies: any[] }[];
  addReply: (text: string, parentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, addReply }) => {
  return (
    <div style={styles.commentsContainer}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};

const styles = {
  commentsContainer: {
    marginTop: '10px',
  },
};

export default CommentList;
