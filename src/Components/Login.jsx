import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[isLogIn,setIsLogIn]=useState(false);


  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [error,setError]=useState("");

  const handleLogin=async ()=>{
    try{
      const res=await axios.post("http://localhost:3000/login",{
        email,password
        },{withCredentials:true}) 
        dispatch(addUser(res.data));
        navigate("/feed");
    }catch(err){
      console.log(err);
      setError(err?.response?.data || "Something went WRONG!!");
    }
  }

  const handleSignUp=async ()=>{
    try{
      const res=await axios.post("http://localhost:3000/signup",{firstName,lastName,email,password},{withCredentials:true});
      dispatch(addUser(res.data.data));
        navigate("/profile");

    }catch(err){
      console.error(err);
      setError(err?.response?.data || "Something went WRONG!!");
    }
  }
 

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-slate-950 text-neutral-content w-96 ">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{isLogIn?"Log Into Your Account":"Sign up your Account"} </h2>
    <div>
    
    {!isLogIn && <>
      <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Enter your First Name:</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
</label>
<label className="form-control w-full max-w-xs py-2">
  <div className="label">
    <span className="label-text">Enter your Last Name:</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
</label>
    </>}

    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Enter your Email ID:</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={(e)=>setEmail(e.target.value)}/>
</label>
<label className="form-control w-full max-w-xs py-2">
  <div className="label">
    <span className="label-text">Enter your Password:</span>
  </div>
  <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={(e)=>setPassword(e.target.value)}/>
</label>
    </div>
    <p className="text-red-600">{error}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={isLogIn?handleLogin:handleSignUp}>{isLogIn ?"Log In":"Sign Up"}</button>
    </div>
    <p className="cursor-pointer" onClick={()=>setIsLogIn((value)=>!value)}>{isLogIn?"New User? Please Sign Up":"Existing User?Please Log In"}</p>
  </div>
</div>
    </div>
  )
}

export default Login