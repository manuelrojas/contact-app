import React from "react";
import ReactMarkdown from "react-markdown";

export type CommentProps = {
  id: number;
  title: string;
  contactId: string;
  content: string;

};

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {

  return (
		<div className="flex flex-col p-8 m-10 bg-gray-100 hover:shodow-lg rounded-2xl">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="flex flex-col ml-3">
						<div className="font-medium leading-none">{comment?.title}</div>
						<p className="text-sm text-gray-600 leading-none mt-1">
							{comment?.content}
						</p>
					</div>
				</div>
			</div>
		</div>
  );
};

export default Comment;
