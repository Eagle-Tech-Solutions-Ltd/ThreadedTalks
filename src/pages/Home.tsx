// src/pages/Home.tsx
import React, { useState } from "react";
import Post from "../components/Post.tsx";
import NewPostForm from "../components/NewPostForm.tsx";
import { Button, Modal } from "react-bootstrap";

const Home: React.FC = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [show, setShow] = useState(false);

  const handlepost = () => {
    addPost();
    setShow(false);
  };

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
      image: require("../assets/images/1.png"),
      description: "Post 1",
      comments: [
        {
          id: 2,
          text: "Great post!",
          replies: [{ id: 3, text: "Thank you!", replies: [] }],
        },
        { id: 4, text: "Nice picture!", replies: [] },
      ],
    },
    {
      id: 5,
      image: require("../assets/images/3.png"),
      description: "Post 2",
      comments: [{ id: 6, text: "Amazing!", replies: [] }],
    },
  ]);

  const addPost = (description: string, imageUrl: string) => {
    const newPost = {
      id: Date.now(),
      image: imageUrl,
      description: description,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setShowPostForm(false);
  };

  const addComment = (postId: number, commentText: string) => {
    console.log("commentText===>", commentText);
    console.log("postId===>", postId);
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

  const addReply = (postId: number, replyText: string, parentId: number) => {
    console.log("replyText===>", replyText);
    console.log("parentId===>", parentId);
    console.log("postId===>", postId);
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
                  : comment
              ),
            }
          : post
      )
    );
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
            {/* {showPostForm ? "Cancel" : "New Post"} */}
          </button>
        </div>
      </div>

      <div>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch Modal
        </Button> */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showPostForm && <NewPostForm onAddPost={addPost} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlepost}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
