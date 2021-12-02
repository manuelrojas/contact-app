import Comment, { CommentProps } from "./Comment";

import { useEffect, useState } from "react";
import axios from 'axios';

type Props = {
  contactId: string,
  refresh: boolean,
}

const ListComment: React.FC<Props> = (props) => {
  const [comments, setComments] = useState([]);
    useEffect(() => {
      async function getComments() {
        let url = `/api/comment/get?contactId=${props.contactId}`;
        const res = await axios.get(url);
        setComments(res.data);
      }  
      getComments();
  
    }, [props.refresh]) 
    
    return (
      <div>
        {!comments.length && <div>loading...</div>}
        {comments.map((comment: CommentProps) => (
            <div key={comment.id} className="post">
              <Comment post={comment} />
            </div>
          ))}
      </div>
    )
   
}

export default ListComment