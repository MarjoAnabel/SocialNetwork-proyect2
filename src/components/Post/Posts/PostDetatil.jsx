import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getById } from '../../../redux/posts/postsSlice'


const PostDetail = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  const { post, isLoading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (_id) {
      console.log('Fetching post with ID:', _id);
      dispatch(getById(_id))
    }
  }, [dispatch, _id])

  useEffect(() => {
    if (post) {
    }
  }, [post]);

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error al cargar el post: {error.message}</p>
  }

  if (!post || Object.keys(post).length === 0) {
    return <p>No se encontró el post</p>
  }

  return (
    <div>
      <h1>Detalles del Post</h1>
      <p>{post?.namepost ? post.namepost : 'Cargando datos del post...'}</p>
    </div>
  )
}

export default PostDetail
