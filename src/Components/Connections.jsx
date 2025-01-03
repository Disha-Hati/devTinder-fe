import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {

    const dispatch=useDispatch();

    const connections=useSelector((store)=>store.connections);

    const fetchConnections=async ()=>{
        try{
            const res=await axios.get(BASE_URL+"user/connections",{withCredentials:true});
            console.log(res);
            dispatch(addConnections(res.data.data));
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[]);

if(!connections) return;

if(connections.length===0) return <h1  className="flex justify-center my-10">No Connections Found!!</h1>

  return (
    <div className="text-center justify-center my-10">
        <h1 className="text-bold text-3xl">Connections</h1>
        {connections.map((connection)=>{
            const {_id,firstName,lastName,photo,about}=connection
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
                            <button className="btn btn-accent">Favorite</button>
                            <button className="btn btn-warning">Remove</button>
                            </div>
                    </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Connections