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
  addComment: (postId: number, parentId: number, replyText: string) => void;
}

const Post: React.FC<PostProps> = ({ post, addComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [ParentId, setParentId] = useState(0);
  const [PostId, setPostId] = useState(0);
  const [ParentText, setParentText] = useState("");

  const handleShowComments = (text) => {
    console.log("textdj,fsfg===>", text);
    if (showComments) {
      setPostId(0);
      setParentId(0);
      setParentText("");
      setShowComments(false);
    } else {
      setPostId(text?.id);
      setParentId(text?.id);
      setShowComments(true);
    }
  };

  return (
    <div className="postContainer">
      <img src={post.image} alt="Post" className="imagesset" />
      <div>
        <p>{post.description}</p>
      </div>

      <div className="alignclickbtn">
        <div className="commentlist">
          <FontAwesomeIcon icon={faThumbsUp} />
          <p>Link</p>
        </div>
        <div>
          <p
            onClick={() => {
              handleShowComments(post);
            }}
            className="commentButton"
          >
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
                setParentId(parentId);
                setParentText(text);
              }}
            />
            <CommentForm
              parentId={ParentId}
              parentText={ParentText}
              onSubmit={(text) => {
                addComment(PostId, ParentId, text);
              }}
              onCancel={() => {
                setPostId(PostId);
                setParentId(PostId);
                setParentText("");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
