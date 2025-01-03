/* eslint-disable react/prop-types */
import axios from "axios";
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";


const UserCard = ({user}) => {
    
    console.log(user);
    const dispatch=useDispatch();
    const {_id,firstName,lastName,age,gender,photo,about}=user;

    const sendRequest=async (status,userId)=>{
      try{
        await axios.post(BASE_URL+"request/send/"+status+"/"+userId,{},{withCredentials:true});
        dispatch(removeUserFromFeed(userId))
      }catch(err){
        console.error(err);
      }
    }
 
  return (
    <div className="card bg-base-200 w-96 shadow-xl">
  <figure>
    <img
      src={photo}
      alt="Profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+lastName}</h2>
    {age && gender &&<p>{age+","+gender}</p>  }
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-error" onClick={()=>sendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-success" onClick={()=>sendRequest("interested",_id)}>Interested</button>
    </div>
  </div> 
</div>
  )
}

export default UserCard