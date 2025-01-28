// src/pages/Home.tsx
import React, { useState } from 'react';
import Post from '../components/Post.tsx';
import NewPostForm from '../components/NewPostForm.tsx';

const Home: React.FC = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            image: 'https://via.placeholder.com/300',
            description: 'Post 1',
            comments: [
                {
                    id: 1,
                    text: 'Great post!',
                    replies: [{ id: 1, text: 'Thank you!' }],
                },
                { id: 2, text: 'Nice picture!', replies: [] },
            ],
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/300',
            description: 'Post 2',
            comments: [{ id: 1, text: 'Amazing!' }],
        },
    ]);

    const [showPostForm, setShowPostForm] = useState(false); // Track if form is visible

    const addPost = (description: string, imageUrl: string) => {
        const newPost = {
            id: Date.now(),
            image: imageUrl,
            description: description,
            comments: [],
        };
        setPosts([newPost, ...posts]); // Add the new post to the list
        setShowPostForm(false); // Hide the form after submitting
    };

    const addComment = (postId: number, commentText: string) => {
        console.log('commentText===>', commentText)
        console.log('postId===>', postId)
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            { id: Date.now(), text: commentText, replies: [] },
                        ],
                    }
                    : post
            )
        );
    };

    const addReply = (postId: number, replyText: string, parentId: number,) => {
        console.log('replyText===>', replyText)
        console.log('parentId===>', parentId)
        console.log('postId===>', postId)
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment.id === parentId
                                ? {
                                    ...comment,
                                    replies: [
                                        ...comment.replies,
                                        { id: Date.now(), text: replyText, replies: [] },
                                    ],
                                }
                                :comment
                        ),
                    }
                    : post
            )
        );
    };

    return (
        <div style={styles.container}>
            {/* Displaying Posts */}
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    addComment={addComment}
                    addReply={addReply}
                />
            ))}

            <div className='d-flex'>
                {/* New Post Form Visibility Toggle */}
                {showPostForm && (
                    <NewPostForm onAddPost={addPost} />
                )}

                {/* New Post Button at the bottom */}
                <button
                    onClick={() => setShowPostForm(!showPostForm)} // Toggle form visibility
                    style={styles.newPostButton}
                >
                    {showPostForm ? 'Cancel' : 'New Post'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        position: 'relative',
    },
    newPostButton: {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Home;
