import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

const TheHeader = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const { user } = useSelector((state) => state.auth)
 
 const onLogout = (e) => {
   e.preventDefault()
   dispatch(logout())
   navigate('/login')

  }
  
  const [postName, setPostName] = useState('')

  const handleChange = (e) => {
    setPostName(e.target.value)
 
  if (e.key === 'Enter') {
    console.log(postName)
    navigate(`/search/${postName}`)
  }
 
 }
 return (
  <nav>
    <Link to="/">Home </Link>
    <input 
    onKeyUp={handleChange}
    placeholder="search post"
    name="text"
  />

    {user ? (
      <>
        <button onClick={onLogout}>Logout</button>
        <Link to="/profile">Profile {user.name}</Link>
      </>
    ) : (
      <>
        <Link to="/login">Login |</Link>
        <Link to="/register"> Register</Link>
      </>
    )}
  </nav>
)
}

export default TheHeader