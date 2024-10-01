import { useSelector } from 'react-redux'

const Comment = () => {
 const { commentList } = useSelector((state) => state.comments)
 return (
   <>
     {commentList &&
       commentList.map((comment) => (
         <div className="comment" key={comment.id}>
           <p>{comment.comment}</p>
         </div>
       ))}
   </>
 )
}
export default Comment