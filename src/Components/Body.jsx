import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"

const Body = () => {

const dispatch=useDispatch();
const navigate=useNavigate();

const user=useSelector((store)=>store.user);

  const fetchUser=async ()=>{
    try{
      const res=await axios.get("http://localhost:3000/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
    }catch(err){
      navigate("/login")
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!user){
      fetchUser();
    }
  },[]);


  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Body
