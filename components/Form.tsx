import axios from 'axios';

type Props = {
    contactId: string;
  };

const Form: React.FC<Props> = (props) => {
    const createComment = async event => {
      event.preventDefault();

    await axios.post('/api/comment/create', {
        contactId: props.contactId,
        title: event.target.title.value,
        content: event.target.content.value,
      });
    }
  
    return (
      <form onSubmit={createComment}>
        <label htmlFor="title">title</label>
        <input id="title" name="title" type="text" autoComplete="title" required />
        <label htmlFor="content">content</label>
        <input id="content" name="content" type="text" autoComplete="content" required />
        <button type="submit">Add</button>
      </form>
    )
  }

  export default Form;