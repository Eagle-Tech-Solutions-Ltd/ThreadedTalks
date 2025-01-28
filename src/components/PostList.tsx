// src/components/PostList.tsx
import React from 'react';
import Post from './Post.tsx';

interface PostListProps {
  posts: {
    id: number;
    title: string;
    image: string;
    content: string;
    comments: { id: number, text: string, replies: any[] }[];
  }[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const addReply = (text: string, parentId: number = 0) => {
    // Handle the adding of a reply here.
    console.log(text, parentId);
  };

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} addReply={addReply} />
      ))}
    </div>
  );
};

export default PostList;
