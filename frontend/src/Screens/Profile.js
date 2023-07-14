import React,{useEffect,useState} from 'react'
import "../css/Profile.css"
import PostDetail from "../components/PostDetail";
import ProfilePic from '../components/ProfilePic';

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([])
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };
 
  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers:{
        Authorization: "Bearer "+ localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      setPic(result.post)
      setUser(result.user)
    })
  }, [])
  

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img  onClick={changeprofile}
            src={user.Photo ? user.Photo : picLink} alt="img"></img>
        </div>
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className='profile-info' style={{display:"flex"}}>
          <p>{pic ? pic.length : "0"} Posts</p>
          <p>{user.followers ? user.followers.length : "0"} Followers</p>
          <p>{user.following ? user.following.length : "0"} Following</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",margin:"25px auto", opacity:"0.8"}}></hr>
      <div className='gallery'>
       {pic.map((pics)=>{
        return <img key={pic._id} src={pics.photo} alt="pic posted"  onClick={() => {toggleDetails(pics)}} className='item'></img>
       })}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {
        changePic && <ProfilePic changeprofile={changeprofile} />
      }
    </div>
  )
}
