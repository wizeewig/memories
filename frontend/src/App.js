import React,{createContext, useState} from 'react';
import './App.css';
import Home from './Screens/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './Screens/Profile';
import CreatePost from './Screens/Createpost';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './Screens/MyFollowingPost';

function App() {

  const [userLogin, setuserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setuserLogin, setModalOpen}}>
      <Navbar login={userLogin}/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route exact path="/profile" element={<Profile/>}></Route>
      <Route path="/createPost" element={<CreatePost/>}></Route>
      <Route path="/profile/:userid" element={<UserProfile/>}></Route>
      <Route path="/myfollowingpost" element={<MyFollowingPost/>}></Route>
     </Routes>
     <ToastContainer theme="colored" position='top-right' autoClose="3000"/>
     {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>

    </div>
    </BrowserRouter>
  );
}

export default App;
