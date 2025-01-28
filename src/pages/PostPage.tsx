// src/pages/PostPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post.tsx';
import { Comment as CommentType } from '../types/Comment.ts';
import '../comment.css'

const posts = [
  {
    id: 1,
    title: 'Post 1',
    image: 'https://via.placeholder.com/800x400',
    content: 'This is the content of the first post.',
    comments: [
      { id: 1, text: 'Great post!', replies: [] },
      { id: 2, text: 'I agree!', replies: [{ id: 3, text: 'Me too!', replies: [] }] },
    ],
  },
  {
    id: 2,
    title: 'Post 2',
    image: 'https://via.placeholder.com/800x400',
    content: 'This is the content of the second post.',
    comments: [],
  },
];

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = posts.find(p => p.id === parseInt(postId || '', 10));

  const [comments, setComments] = useState<CommentType[]>(post?.comments || []);

  const addReply = (text: string, parentId: number = 0) => {
    const addCommentRecursively = (comments: CommentType[]): CommentType[] =>
      comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, { id: Date.now(), text, replies: [] }] }
          : { ...comment, replies: addCommentRecursively(comment.replies) }
      );

    if (!parentId) {
      setComments([...comments, { id: Date.now(), text, replies: [] }]);
    } else {
      setComments(addCommentRecursively(comments));
    }
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <Post post={{ ...post, comments }} addReply={addReply} />
    </div>
  );
};

export default PostPage;
