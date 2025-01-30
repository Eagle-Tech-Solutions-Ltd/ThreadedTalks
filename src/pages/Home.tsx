// src/pages/Home.tsx
import React, { useState } from "react";
import Post from "../components/Post.tsx";
import NewPostForm from "../components/NewPostForm.tsx";
import { Modal } from "react-bootstrap";

const Home: React.FC = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setShowPostForm(true);
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      image: require("../assets/images/2.png"),
      description: "Nature's masterpiece: where golden aspens meet snow-capped peaks.",
      comments: [
        {
          id: 101,
          text: "This looks like a postcard! Stunning shot!",
          replies: [{
            id: 10101,
            text: "Right? Nature really knows how to create perfection! Glad you liked it!",
            replies: [{
              id: 1010101,
              text: "This is [Location Name]—a must-visit spot! You’d love it",
              replies: []
            }]
          },
          {
            id: 10102,
            text: "Totally agree! The lighting made it feel even more surreal",
            replies: []
          }],
        },
        {
          id: 102,
          text: "Nature at its finest! Love the mix of colors.",
          replies: [{
            id: 10201,
            text: "Absolutely! The contrast is what makes it so magical.",
            replies: []
          }]
        },
        {
          id: 103,
          text: "Where is this magical place? I need to visit!",
          replies: []
        },
        {
          id: 104,
          text: "Golden hour vibes on another level",
          replies: []
        },
      ],
    },
    {
      id: 2,
      image: require("../assets/images/4.png"),
      description: "Where the wild river meets majestic mountains, serenity finds its home.",
      comments: [{
        id: 201,
        text: "This looks so peaceful and untouched!",
        replies: []
      },
      {
        id: 201,
        text: "The water looks so pristine! Is this heaven on Earth",
        replies: []
      },
      {
        id: 201,
        text: "That view is worth every hike! Absolutely stunning",
        replies: []
      }],
    },
  ]);

  const addPost = (description: string, imageUrl: string) => {
    console.log('description===>', description)
    console.log('imageUrl===>', imageUrl)
    const newPost = {
      id: Date.now(),
      image: imageUrl,
      description: description,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setShowPostForm(false);
  };

  const addCommentReply = (
    postId: number,
    parentId: number,
    commentText: string
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            comments:
              postId === parentId
                ? [
                  ...post.comments,
                  { id: Date.now(), text: commentText, replies: [] },
                ]
                : addCommentRecursively(post.comments, parentId, commentText),
          }
          : post
      )
    );
  };

  const addCommentRecursively = (comments, parentId, commentText) =>
    // console.log('comments====>',comments);
    comments?.map((comment) =>
      comment.id === parentId
        ? {
          ...comment,
          replies: [
            ...comment.replies,
            { id: Date.now(), text: commentText, replies: [] },
          ],
        }
        : {
          ...comment,
          replies: addCommentRecursively(
            comment.replies,
            parentId,
            commentText
          ),
        }
    );

  return (
    <div className="container">
      <div className="commentcontainer">
        {/* Displaying Posts */}
        {posts.map((post) => (
          <Post key={post.id} post={post} addComment={addCommentReply} />
        ))}

        <div className="d-flex">
          <button onClick={handleShow} className="newPostButton">
            New Post
          </button>
        </div>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showPostForm && <NewPostForm onAddPost={addPost} handleClose={handleClose} />}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
