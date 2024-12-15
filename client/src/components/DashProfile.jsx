import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {updateStart, updateSuccess, updateFailure} from '../redux/user/userSlice'


export default function DashProfile() {
  const { currentUser} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [userUpdateSuccess, setUserUpdateSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch=useDispatch();

  const handleFormChange=(e)=>{
    setErrorMessage('');
    setUserUpdateSuccess('');
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(Object.keys(formData).length===0){
      return
    }

    try{
      dispatch(updateStart());

      const res=await fetch(`/api/user/update/${currentUser.validUser._id}`, {
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })

      const data=await res.json();

      if(!res.ok){
         dispatch(updateFailure(data.message));
         setErrorMessage(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUserUpdateSuccess('user updated successfully')
      }

    }catch(err){
      dispatch(updateFailure(err.message));
      setErrorMessage(err.message);
    }
    
  }

  return (
    <div className="flex flex-grow justify-center items-center px-4 py-6">
      <div className="relative flex flex-col gap-11 items-center min-w-full md:min-w-[450px]">
        <h1 className="font-bold text-3xl">Profile</h1>

        <form className="flex flex-col items-center gap-5 w-full">

            <input type="file" accept="image/*" className="hidden" />
        {/* image wrapper  */}
        <div className="relative h-36 w-36 rounded-full cursor-pointer overflow-hidden border-[2px] mb-5" >
          <img
            src={currentUser.validUser.profilePicture}
            alt="profile"
            className="object-cover h-full w-full"
          />
        </div>

          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
            defaultValue={currentUser.validUser.username}
            onChange={(e)=>handleFormChange(e)}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="bg-gray-200 text-black px-4 py-2 Pbackgrounrounded-lg w-full outline-none "
            defaultValue={currentUser.validUser.email}
            onChange={(e)=>handleFormChange(e)}
            readOnly
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
            onChange={(e)=>handleFormChange(e)}
          />

          <button type='submit' onClick={(e)=>handleSubmit(e)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
        </form>
        {errorMessage && <div className="w-full text-black bg-red-200 px-4 py-2 rounded-lg">{
          errorMessage}</div>}

        {userUpdateSuccess && <div className="w-full text-black bg-green-200 px-4 py-2 rounded-lg">{
          userUpdateSuccess}</div>}

        <div className="w-full font-semibold flex justify-between text-red-500">
            <button>Delete Account</button>
            <button>Log Out</button>
        </div>
      </div>
    </div>
  );
}
