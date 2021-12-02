import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  title: string;
  contactId: string;
  content: string;

};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = "Unknown author";

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2> 
      <small>By {authorName}</small>
      <ReactMarkdown source={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
