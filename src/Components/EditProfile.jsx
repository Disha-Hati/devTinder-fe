/* eslint-disable react/prop-types */
import { useState } from "react"
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    const[firstName,setFirstName]=useState(user.firstName);
    const[lastName,setLastName]=useState(user.lastName);
    const[age,setAge]=useState(user.age ||"");
    const[gender,setGender]=useState(user.gender);
    const[photo,setPhoto]=useState(user.photo);
    const[about,setAbout]=useState(user.about);
    const[error,setError]=useState("");
    const[toast,setToast]=useState(false);

    const dispatch=useDispatch();

    const saveProfile=async ()=>{
        setError("")
        try{
            const res=await axios.patch("http://localhost:3000/profile/edit",{firstName,lastName,age,gender,photo,about},{withCredentials:true});
            //console.log(res);
            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            },3000);
        }catch(err){
            console.error(err);
            setError(err?.response?.data );
        }
    }


  return (
   user && (
    <div className="flex justify-center my-10">
     <div className="flex justify-center ">
      <div className="card bg-base-100 text-neutral-content w-96">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Edit Profile ✏</h2>
    <div>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs py-3">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Change your Photo</span>
  </div>
  <input type="text" value={photo} onChange={(e)=>setPhoto(e.target.value)}  className="input input-bordered w-full max-w-xs" />
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input type="text" value={age} onChange={(e)=>setAge(e.target.value)}  className="input input-bordered w-full max-w-xs" />
</label>

<div className="label">
    <span className="label-text">Select your Gender</span>
  </div>
<select className="select select-bordered w-full max-w-xs" onChange={(e)=>setGender(e.target.value)}>
  <option disabled selected>Select from here</option>
  <option>male</option>
  <option>female</option>
  <option>others</option>
</select>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)}  className="input input-bordered w-full max-w-xs" />
</label>

    </div>
    <p className="text-red-600">{error}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>

    
    <div>
    <h2 className="card-title">Profile Preview</h2>
    <UserCard user={{firstName,lastName,age,gender,photo,about}}/>
    </div>
    
   {toast &&(
    <div className="toast toast-top toast-center">
    <div className="alert alert-info">
        <span>Your profile has been updated!!</span>
    </div>
    </div>
   )}

   </div>
   )
  )
}

export default EditProfile