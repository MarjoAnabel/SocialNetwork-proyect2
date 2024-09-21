import React from "react"
import { Link } from "react-router-dom"

const Post = ({ post, index }) => {
  return (
    <div key={post._id} className="post">
      <h2>Post nº {index}</h2>
      <p>{post.namepost || 'Cargando...'}</p>
    </div>
  )
}

export default Post

