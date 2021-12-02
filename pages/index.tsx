import React from "react";
import Layout from "../components/Layout";
import Form from "../components/Form"
import ListComment from "../components/ListComment"
import axios from 'axios';
import useSWR from 'swr';


const fetcher = async (url: string) => { 
  const rest = await axios.get(url); 
  return rest.data; 
};

export type Contact = {
  id: string;
  name: string;
  photo: string;
  email: string;
};

const Blog: React.FC = () => {
  const { data, error } = useSWR('/api/people/getContact', fetcher);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
        {data && data.map((contact: Contact) => (
              <div key={contact.id}  className="post">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.photo}</p>
                <ListComment contactId={contact.id} />
                <Form contactId={contact.id} /> 
                
              </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
