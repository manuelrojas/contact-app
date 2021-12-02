type Props = {
    contactId: string;
    createComment: Function;
  };

const Form: React.FC<Props> = (props) => {
  
    return (
      <div className="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={(e) => props.createComment(e, props.contactId)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <label className="px-4 pt-3 pb-2 text-gray-800 text-lg" htmlFor="title">Title</label>
              <input id="title" 
                className="leading-none md:w-full text-gray-900 p-3 focus:outline-none focus:border-blue-700 m-4 bg-gray-100 border rounded border-gray-200" 
                name="title" 
                type="text" 
                placeholder="Enter a title"
                autoComplete="title" 
                required 
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <label className="px-4 pt-3 pb-2 text-gray-800 text-lg" htmlFor="content">Comment</label>
                <textarea 
                  id="content" 
                  name="content"
                  placeholder="Enter a comment"
                  className="h-40 md:w-full  m-4 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" 
                  required>
                </textarea>
            </div>

            <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
               <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>
               <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
            </div>

            <div className="-mr-1">
            <button 
              className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
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