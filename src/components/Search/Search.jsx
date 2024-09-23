import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostByName } from '../../redux/posts/postsSlice'
const Search = () => {
  const { posts, loading } = useSelector((state) => state.posts);
  const { postName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postName) {
      dispatch(getPostByName(postName)); // Despacha la acción con el nombre del post
    }
  }, [postName, dispatch]);

  if (loading) {
    return <p>Cargando posts...</p>;
  }

  console.log ("Post recibidos", posts)

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.postName}</h2>
          </div>
        ))
      ) : (
        <p>No se encontraron posts</p>
      )}
    </>
  );
}

export default Search
