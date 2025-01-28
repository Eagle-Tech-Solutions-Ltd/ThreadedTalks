// src/components/Post.tsx
import React, { useState } from "react";
import CommentForm from "./CommentForm.tsx";
import CommentList from "./CommentList.tsx";
import postImage from "../assets/images/1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import "../comment.css";

interface PostProps {
  post: {
    id: number;
    image: string;
    description: string;
    comments: { id: number; text: string; replies: any[] }[];
  };
  addComment: (postId: number, commentText: string) => void;
  addReply: (postId: number, replyText: string, parentId: number) => void;
}

const Post: React.FC<PostProps> = ({ post, addComment, addReply }) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div style={styles.postContainer}>
      {/* <img src={post.image} alt="Post" style={styles.image} /> */}
      <img src={postImage} alt="Post" className="imagesset" />
      <div>
        <p>{post.description}</p>
      </div>

      <div className="alignclickbtn">
        <div className="commentlist">
          <FontAwesomeIcon icon={faThumbsUp} />
          <p>Link</p>
        </div>
        <div>
          <p onClick={handleShowComments} className="commentButton">
            💬 {post.comments?.length} Comments
          </p>
        </div>
        <div>
          <p
            onClick={function () {
              console.log("share");
            }}
            className="commentButton"
          >
            <FontAwesomeIcon icon={faShare} /> {post.comments?.length} Share
          </p>
        </div>
      </div>

      <div>
        {showComments && (
          <div style={styles.commentsSection}>
            <CommentList
              comments={post.comments}
              addReply={(text, parentId) => {
                addReply(post.id, text, parentId);
              }}
            />
            <CommentForm
              parentId={post.id}
              onSubmit={(text) => {
                addComment(post.id, text);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  postContainer: {
    width: "800px",
    marginBottom: "20px",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
  },
  image: {
    width: "80%",
    borderRadius: "10px",
  },
  // commentButton: {
  //   marginTop: "10px",
  //   backgroundColor: "#007BFF",
  //   color: "white",
  //   border: "none",
  //   padding: "8px 16px",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  // },
};

export default Post;
