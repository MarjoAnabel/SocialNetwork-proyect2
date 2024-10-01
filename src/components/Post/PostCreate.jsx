import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { reset, createPost } from '../../redux/posts/postsSlice' 

const CreatePost = () => {
    const [formData, setFormData] = useState({ namepost: '' });
    const { namepost } = formData;
    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }


    const onSubmit = (e) => {
        e.preventDefault()
        console.log('formData', formData)
        dispatch(createPost(formData)) // Llama a la acción para crear el post
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, isSuccess, message } = useSelector((state) => state.posts);

    useEffect(() => {
        if (isError) {
            notification.error({ message: 'Error', description: message });
        }
        if (isSuccess) {
            notification.success({ message: 'Success', description: 'Post created successfully!' });
            setTimeout(() => {
                navigate('/'); // Navegar a la página de posts o donde desees
            }, 2000);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, dispatch, navigate]);

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="namepost"
                value={namepost}
                onChange={onChange}
                placeholder="Enter post title" // Placeholder para el input
                required // Hace que el campo sea obligatorio
            />
            <button type="submit">Create Post</button>
        </form>
    )
}

export default CreatePost;
