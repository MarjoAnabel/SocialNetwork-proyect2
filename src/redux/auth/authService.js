import axios from 'axios'

const API_URL = 'http://localhost:3001'

const register = async (userData) => {
 const res = await axios.post(`${API_URL}/users`,userData)
 return res.data
}

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData)
  console.log (res.data)
  if(res.data){
      localStorage.setItem("user", JSON.stringify(res.data.user))
      localStorage.setItem("token", JSON.stringify(res.data.token))
      // En lugar de devolver 'res', devuelve un objeto con los datos necesarios
      return {
          user: res.data.user,
          token: res.data.token
      };
  }
}


   const logout = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
     const res = await axios.delete(`${API_URL}/users/logout`, {
       headers: {
         authorization: token,
       }
     })
      if (res.data) localStorage.clear()
     return res.data
    }
    

   

const authService = {
 register,
 login,
 logout,
}

export default authService
