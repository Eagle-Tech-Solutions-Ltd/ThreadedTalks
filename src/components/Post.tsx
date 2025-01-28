// src/components/Post.tsx
import React, { useState } from "react";
import CommentForm from "./CommentForm.tsx";
import CommentList from "./CommentList.tsx";
// import postImage from "../assets/images/1.png";
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
    <div className="postContainer">
      <img src={post.image} alt="Post" className="imagesset" />
      {/* <img src={postImage} alt="Post" className="imagesset" /> */}
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
          <div>
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

export default Post;
