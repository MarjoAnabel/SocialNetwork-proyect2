import React from 'react'
import Comment from './Comment'
import { useDispatch } from 'react-redux'
import { getAll } from '../../redux/comments/commentsSlice'


const CommentList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAll())
    }, [])
    return (
      <div>
        <h1>Comments List</h1>
        <Comment/>
      </div>
    )
}

export default CommentList