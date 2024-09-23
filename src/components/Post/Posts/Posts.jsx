import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAll, reset, like } from "../../../redux/posts/postsSlice"
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

const Posts = () => {
  const { isLoading, posts } = useSelector((state) => state.posts)
  console.log (posts)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAll())
       dispatch(reset())
  }, [dispatch])

  const post = posts?.map((post) => {
    const isAlreadyLiked = post.likes.includes(user?.id)
    return (
      <div className="Post" key={post._id}>
        <p>{post.namepost}</p>
        <span>Like {post.likes.length}</span>
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => console.log('dislike')} />
        ) : (
          <HeartOutlined onClick={() => dispatch(like(posts._id))} />
        )}
      </div>
    )
  })
  return post
}

export default Posts
