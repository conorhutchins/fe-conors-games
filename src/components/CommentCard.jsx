import { format } from "date-fns";
import "../styles/commentCard.css";

const CommentCard = ({ comment }) => {
  const { id, body, votes, author, created_at } = comment;
  
  const formattedDate = format(new Date(created_at), "hh:mm 'on' dd/MM/yyyy");

  return (
    <section className="comment-card" key ={id}>
      <p className="comment-body">{body}</p>
      <p className="comment-author">Author: {author}</p>
      <p className="comment-votes">Votes: {votes}</p>
      <p className="comment-created-at">Posted at: {formattedDate}</p>
    </section>
  );
};

export default CommentCard;
