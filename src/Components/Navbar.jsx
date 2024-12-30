import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";


const Navbar = () => {

  const user=useSelector((store)=>store.user);
  const connections=useSelector((store)=>store.connections);
  const requests=useSelector((store)=>store.requests);


  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const handleLogOut=async ()=>{
    try{
     await axios.post("http://localhost:3000/logout",{},{withCredentials:true})
     dispatch(removeUser());
    navigate("/login");
    }catch(err){
      console.error(err);
    }
  }
  
  return (
    <div className="navbar bg-base-200">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">💻devTinder</Link>
  </div>
  {user && ( <div className="flex-none gap-2">
    <div className="form-control">Hi,{user.firstName}</div>
   <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src={user.photo} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections<span className="badge">{connections && connections.length}</span></Link></li>
        <li><Link to="/requests">Requests<span className="badge">{requests && requests.length}</span></Link></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default Navbar
