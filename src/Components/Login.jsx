import { useState } from "react"

const Login = () => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 text-neutral-content w-96">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Log Into Your Account </h2>
    <div>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Enter your Email ID:</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={email} onChange={(e)=>setEmail(e.target.value)}/>
</label>
<label className="form-control w-full max-w-xs py-3">
  <div className="label">
    <span className="label-text">Enter your Password:</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={password} onChange={(e)=>setPassword(e.target.value)}/>
</label>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Log In</button>
      <button className="btn btn-ghost">Sign Up</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login