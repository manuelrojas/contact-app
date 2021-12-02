import React, { useState } from "react";
import Layout from "../components/Layout";
import Form from "../components/Form"
import ListComment from "../components/ListComment"
import useFetch from "react-fetch-hook";
import axios from 'axios';

export type Contact = {
  id: string;
  name: string;
  photo: string;
  email: string;
};

const Main: React.FC = () => {
  const { isLoading, data = [] } = useFetch('/api/people/getContact');
  const [refresh, setRefresh] = useState(false);


  const createComment = async (event, contactId) => {
    event.preventDefault();

    await axios.post('/api/comment/create', {
        contactId: contactId,
        title: event.target.title.value,
        content: event.target.content.value,
    });

    setRefresh(!refresh);
  }

  return (
    <Layout>
      <div className="page">
        <h1>Your contacts</h1>
        <main>
        {data && data.map((contact: Contact) => (
            <div>
              <div key={contact.id}  className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                <img 
                  className="object-center object-cover rounded-full h-36 w-36" 
                  src={contact.photo} alt="photo" />
                <p className="text-xl text-gray-700 font-bold mb-2">{contact.name}</p>
                <p className="text-base text-gray-400 font-normal">{contact.email}</p>
              </div>
                <ListComment contactId={contact.id} refresh={refresh} />
                <Form contactId={contact.id} createComment={createComment} /> 
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

export default Main
