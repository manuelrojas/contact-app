import Post, { PostProps } from "./Post";
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url: string, id: string) => { 
  const rest = await axios.get(`${url}?contactId=${id}`); 
  return rest.data; 
};

type Props = {
  contactId: string
}

const ListComment: React.FC<Props> = (props) => {
  const { data, error } = useSWR(['/api/comment/get', props.contactId], fetcher);
    return (
      <div>
        {data?.map((comment: PostProps) => (
            <div key={comment.id} className="post">
              <Post post={comment} />
            </div>
          ))}
      </div>
    )
   
}

export default ListComment