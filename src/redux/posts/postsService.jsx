import axios from "axios"

const API_URL = "http://localhost:3001"



const createPost = async (post) => {
  const user = JSON.parse(localStorage.getItem('user')) // Obtiene el usuario desde el localStorage
  const res = await axios.post(`${API_URL}/posts/create`, post, {
    headers: {
      authorization: user?.token, // Agrega el token de autorización
    },
  });
  return res.data; // Retorna la respuesta de la API
}

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
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error("User not authenticated");
  }
  return fetchData('put', `${API_URL}/posts/like/id/${_id}`);
};



// const dislike = async (_id) => {
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.token) throw new Error('User not authenticated');

//     const res = await axios.put(
//       `${API_URL}/posts/delLike/${_id}`, // Ruta para quitar like
//       {}, 
//       {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     console.error('Error disliking post:', error.message || error);
//     throw error;
//   }
// };
 
 

const postsService = {
  createPost,
  getAll,
  getById,
  getPostByName,
  like,
  // dislike,
}

export default postsService