import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";


const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  

  const getFeed=async ()=>{
    // if(feed) return;
    try{
      const res=await axios.get(BASE_URL +"user/feed",{withCredentials:true});
      console.log(res.data);
    dispatch(addFeed(res.data));
    console.log("Here is Feed"+ feed);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getFeed();
  },[dispatch]);


  if (!feed || feed.length <= 0) {
    return <h1 className="flex justify-center my-10">No new users found!!</h1>;
  }

  return feed && (
    <div className="flex justify-center my-10">
    <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed