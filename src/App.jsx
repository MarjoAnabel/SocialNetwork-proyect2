import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import TheHeader from './components/TheHeader/TheHeader'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import PostDetail from "./components/Post/Posts/PostDetatil"


function App() {
  return (
  <div className='App'>
  <BrowserRouter>
  <TheHeader />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts/id/:_id" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
</div>
)

}

export default App
