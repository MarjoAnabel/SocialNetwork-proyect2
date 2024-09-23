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

 const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const res = await axios.put(
    `${API_URL}/posts/likes/${_id}`,{}, {
      headers: {
        authorization: user?.token,
      },
    }
  )
  return res.data
 }
 
 

const postsService = {
  getAll,
  getById,
  getPostByName,
  like,
}

export default postsService