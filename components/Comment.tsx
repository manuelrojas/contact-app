import React from "react";
import ReactMarkdown from "react-markdown";

export type CommentProps = {
  id: number;
  title: string;
  contactId: string;
  content: string;

};

const Comment: React.FC<{ post: CommentProps }> = ({ post }) => {

  return (
    <div>
      <h2>{post.title}</h2> 
      <ReactMarkdown source={post.content} />
    </div>
  );
};

export default Comment;
