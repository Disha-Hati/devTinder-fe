import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constants"

const Body = () => {

const dispatch=useDispatch();
const navigate=useNavigate();

const user=useSelector((store)=>store.user);

  const fetchUser=async ()=>{
    try{
      const res=await axios.get(BASE_URL +"profile/view",{withCredentials:true});
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
