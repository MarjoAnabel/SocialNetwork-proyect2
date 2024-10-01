import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, notification,Button } from 'antd';
import { getById } from '../../../redux/posts/postsSlice'


const PostDetail = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  const { post, isLoading, error } = useSelector((state) => state.posts)
  const [likedPost, setLikedPost] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

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

  const handlePostLike = async () => {
    if (!user) {
      notification.warning({ message: 'Debes iniciar sesión para dar like' });
      return;
    }

    try {
      const isAlreadyLiked = post.likes?.includes(user._id);
      const updatedLikes = isAlreadyLiked
        ? post.likes.filter(id => id !== user._id)
        : [...(post.likes || []), user._id];

      dispatch(updatePostLikes({ ...post, likes: updatedLikes }));
      setLikesCount(updatedLikes.length);
      setLikedPost(!isAlreadyLiked);

      await dispatch(likePost(post._id)).unwrap();

      notification.success({
        message: `Has ${isAlreadyLiked ? 'quitado' : 'dado'} like al post`,
      });

      dispatch(getById(post._id));
    } catch (error) {
      console.error('Error al dar/quitar like al post:', error);
      notification.error({ message: 'Error al dar/quitar like al post', description: error.message });
    }
  };


  return (
    <div>
      <h1>Detalles del Post</h1>
      <p>{post?.namepost ? post.namepost : 'Cargando datos del post...'}</p>
      <Card
        style={{ width: '100%' }}
        cover={<img alt="example" src={post.imageUrl} />}
      >
        <Meta title={post.title} description={post.body} />
        <div>
          <Button onClick={handlePostLike}>
            {likedPost ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} 
            {likesCount} Likes
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default PostDetail
