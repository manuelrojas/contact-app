type Props = {
    contactId: string;
    createComment: Function;
  };

const Form: React.FC<Props> = (props) => {
  
    return (
      <form onSubmit={(e) => props.createComment(e, props.contactId)}>
        <label htmlFor="title">title</label>
        <input id="title" name="title" type="text" autoComplete="title" required />
        <label htmlFor="content">content</label>
        <input id="content" name="content" type="text" autoComplete="content" required />
        <button type="submit">Add</button>
      </form>
    )
  }

  export default Form;