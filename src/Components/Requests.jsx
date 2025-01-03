import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {addRequest, removeRequest} from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {

    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);

    const[toast,setToast]=useState(false);

    const fetchRequests=async ()=>{
        try{
            const res=await axios.get("http://localhost:3000/user/request/received",{withCredentials:true});
            dispatch(addRequest(res.data.data));
           
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    const reviewRequest=async(status,_id)=>{
        try{
            await axios.post(BASE_URL+"request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            },3000);
        }catch(err){
            console.error(err);
        }
    }


    if(!requests) return;

    if(requests.length===0) return <h1 className="flex justify-center my-10">No Connections Found!!</h1>
    
      return (
        <div className="text-center justify-center my-10">
            <h1 className="text-bold text-3xl">Pending Requests</h1>
            {requests.map((request)=>{
                const {_id,firstName,lastName,photo,about}=request.fromUserId;
                return(
                    // eslint-disable-next-line react/jsx-key
                    <div key={_id}className="py-5">
                        <div className="card card-side bg-base-200 shadow-xl mx-20 px-20">
                        <figure>
                            <img
                            src={photo} className="w-20 h-25 rounded-xl"
                            alt="Movie" />
                        </figure>
                        <div className="card-body ">
                            <h2 className="card-title">{firstName+"  "+lastName}</h2>
                            <p className="text-left">{about}</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-success" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                                <button className="btn btn-error" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                                </div>
                        </div>
                        </div>
                    </div>
                )
            })}


            {toast &&(
    <div className="toast toast-top toast-center">
    <div className="alert alert-info">
        <span>Requests Updated Successfully!</span>
    </div>
    </div>
   )}

        </div>
      )
    }

export default Requests