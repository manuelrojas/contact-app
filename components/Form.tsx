import React, { useState } from "react";

type Props = {
    contactId: string;
    createComment: Function;
};

const Form: React.FC<Props> = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const reset = () => {
    setContent('');
    setTitle('');
  }
  
  return (
      <div className="flex  items-center justify-center shadow-lg mt-10 mx-8 mb-4 max-w-lg">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={(e) => props.createComment(e, props.contactId, reset)}>
            <div className="flex flex-wrap -mx-3 ">
              <label className="px-4 pt-1 pb-2 text-gray-800 text-lg" htmlFor="title">Title</label>
              <input 
                id="title" 
                className="leading-none md:w-full text-gray-900 p-3 focus:outline-none focus:border-blue-700 m-4 mt-2 bg-gray-100 border rounded border-gray-200" 
                name="title" 
                type="text" 
                placeholder="Enter a title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required 
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <label className="px-4 pt-3 pb-2 text-gray-800 text-lg" htmlFor="content">Comment</label>
                <textarea 
                  id="content" 
                  name="content"
                  placeholder="Enter a comment"
                  className="h-40 md:w-full  mx-4 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700  bg-gray-100 border rounded border-gray-200"
                  value={content}
                  onChange={e => setContent(e.target.value)} 
                  required>
                </textarea>
            </div>
            <div className="w-fullflex items-start md:w-full px-3">
                <div className="">
                  <button 
                    className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-4 ease-linear transition-all duration-150" 
                    type="submit">
                    Add
                  </button>
                </div>
            </div>
        </form>
      </div>
     
    )
  }

  export default Form;