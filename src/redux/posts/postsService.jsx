import axios from "axios"

const API_URL = "http://localhost:3001"

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts")
  return res.data
}

const getById = async (id) => {
    const res = await axios.get(API_URL + `/posts/id/${id}`)
    return res.data
  }
  
  const getPostByName = async (postName) => {
    const res = await axios.get(`${API_URL}/posts/name/${postName}`)
    return res.data
 }
 

const postsService = {
  getAll,
  getById,
  getPostByName
}

export default postsService