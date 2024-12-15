import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser.validUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setErrorMessage(data.message);
      } else {
        dispatch(updateSuccess(data));
        setSuccessMessage("user updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setErrorMessage(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setModalOpen(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.validUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        setErrorMessage(data.message);
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/sign-in");
      }
    } catch (err) {
      setErrorMessage(err.message);
      dispatch(deleteUserFailure(err.message));
    }
  };


  const handleSignOut=async()=>{
    try{
      const res=await fetch(`/api/user/signout`, {
        method:"POST",
      });

      const data=await res.json();
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess());
      }
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="flex flex-grow justify-center items-center px-4 py-6">
        <div className="relative flex flex-col gap-11 items-center min-w-full md:min-w-[450px]">
          <h1 className="font-bold text-3xl">Profile</h1>

          <form className="flex flex-col items-center gap-5 w-full">
            <input type="file" accept="image/*" className="hidden" />
            {/* image wrapper  */}
            <div className="relative h-36 w-36 rounded-full cursor-pointer overflow-hidden border-[2px] mb-5">
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
              onChange={(e) => handleFormChange(e)}
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              className="bg-gray-200 text-black px-4 py-2 Pbackgrounrounded-lg w-full outline-none "
              defaultValue={currentUser.validUser.email}
              onChange={(e) => handleFormChange(e)}
              readOnly
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
              onChange={(e) => handleFormChange(e)}
            />

            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>
          </form>
          {errorMessage && (
            <div className="w-full text-black bg-red-200 px-4 py-2 rounded-lg">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="w-full text-black bg-green-200 px-4 py-2 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="w-full font-semibold flex justify-between text-red-500">
            <button onClick={() => setModalOpen(true)}>Delete Account</button>
            <button onClick={()=>handleSignOut()}>Log Out</button>
          </div>
        </div>
        <div
          className={`${
            modalOpen ? "block" : "hidden"
          } absolute z-[150] h-full w-full bg-black left-0 top-0 bg-opacity-70 flex justify-center items-center`}
        >
          <div className="relative text-center  bg-white px-10 py-8 rounded-lg max-w-[350px]">
            {/* icon  */}
            <div className="text-5xl text-gray-400">
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>

            <h2 className="mt-8 font-semibold ">
              Are you sure you want to delete your account?
            </h2>

            <div className="flex justify-between flex-wrap font-semibold mt-8">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
                onClick={() => handleDeleteAccount()}
              >
                Yes I'm sure
              </button>
              <button
                className="border-[1px] px-4 py-2 rounded-xl"
                onClick={() => setModalOpen(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
