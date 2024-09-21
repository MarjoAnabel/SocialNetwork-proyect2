import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAll, reset } from "../../../redux/posts/postsSlice"
import Post from "../Post"
import {Link} from "react-router-dom"

const Posts = () => {
  const { isLoading, posts } = useSelector((state) => state.posts)
  console.log (posts)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAll())
       dispatch(reset())
  }, [dispatch])

  return (
    <>
      {isLoading ? (
        'Cargando...'
      ) : (
        <div>
          {posts?.length > 0 ? (
            posts.map((post, index) => (
              <div key={post._id}>
                <Post post={post} index={index} />
                <Link to={`/posts/id/${post._id}`}>VER</Link>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </>
  )
}

export default Posts
