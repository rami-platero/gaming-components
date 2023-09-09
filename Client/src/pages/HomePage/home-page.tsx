import { useDeleteCommentMutation } from "../../redux/services/commentsApi";


const HomePage = () => {

const [deleteComment] = useDeleteCommentMutation()

  return (
    <main>
      <button onClick={()=>{
        deleteComment(null)
      }}>DELETE COMMENT</button>
    </main>
  );
};

export default HomePage;
