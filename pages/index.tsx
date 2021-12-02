import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Form from "../components/Form"
import ListComment from "../components/ListComment"
import axios from 'axios';

export type Contact = {
  id: string;
  name: string;
  photo: string;
  email: string;
};

const Main: React.FC = () => {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
      async function getContacts() {
        let url = `/api/people/getContact`;
        const res = await axios.get(url);
        setContacts(res.data);
      }  
      getContacts();
  
  }, []);
  
  const createComment = async (
    event: React.SyntheticEvent<EventTarget>, 
    contactId: string, 
    reset: Function) => {
      event.preventDefault();
      await axios.post('/api/comment/create', {
          contactId: contactId,
          title: event.target["title"].value,
          content: event.target["content"].value,
      });
      setRefresh(!refresh);
      reset();
  } 

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your contacts</h1>
        <main>
        {contacts && contacts.map((contact: Contact) => (
              <div key={contact.id}  className="m-10 bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                <img 
                  className="object-center object-cover rounded-full h-36 w-36" 
                  src={contact.photo} alt="photo" />
                <p className="text-xl text-gray-700 font-bold mb-2">{contact.name}</p>
                <p className="text-base text-gray-400 font-normal">{contact.email}</p>
                <div className="flex flex-row justify-around items-start  w-full">
                    <ListComment contactId={contact.id} refresh={refresh} />
                    <Form contactId={contact.id} createComment={createComment} /> 
                </div>
              </div> 
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Main
