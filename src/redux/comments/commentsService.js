import axios from 'axios'

const API_URL = 'http://localhost:3001'

const getAll = async () => {
 const res = await axios.get(`${API_URL}/comments`)
 return res.data
}

const commentsService = {
 getAll,
}

export default commentsService