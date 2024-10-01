import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset, likePost} from "../../../redux/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return <p>No posts available</p>;
  }

  const handleLike = async (postId) => {
    if (user) {
      try {
        const post = posts.find(post => post._id === postId);
        const isAlreadyLiked = post.likes.includes(user._id);

        const updatedLikes = isAlreadyLiked
          ? post.likes.filter(id => id !== user._id)
          : [...post.likes, user._id];

        dispatch(updatePostLikes({ ...post, likes: updatedLikes }));

        const updatedPost = await dispatch(likePost(postId)).unwrap();
        notification.success({ message: updatedPost.message });
      } catch (err) {
        notification.error({ message: 'Error al dar like', description: err.message });
      }
    } else {
      notification.warning({ message: 'Debes iniciar sesión para dar like' });
    }
  };

  const postList = posts?.map((post) => {
    const likesArray = post.likes || [];
    const isAlreadyLiked = likesArray.includes(user?.id);

    return (
      <div className="Post" key={post._id}>
        <p>{post.namepost}</p>
        <span>Likes: {likesArray.length}</span>
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => handleLike(post._id)} />
        ) : (
          <HeartOutlined onClick={() => handleLike(post._id)} />
        )}
      </div>
    );
  });

  return <div>{postList}</div>;
};

export default Posts;


