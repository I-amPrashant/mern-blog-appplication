import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";


export default function DashSidebar() {
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
          navigate('/sign-in')
        }
      }catch(err){
        console.log(err.message)
      }
    }
  
  return (
    <div className={`flex flex-col  gap-4 px-6 py-4 bg-slate-100 ${theme==='dark'?'dark:bg-[#131b30]':''} h-full`}>
      <Link to="/dashboard?tab=profile">
        <button
          className={`relative text-start w-full text-black hover:bg-gray-200  ${
            tab === "profile" && "bg-gray-200"
          } duration-300 ease-in-out py-2 px-3 rounded-lg`}
        >
          {" "}
          <span>
            <i className="fa-solid fa-user"></i>
          </span>{" "}
          &nbsp; Profile{" "}
          <span
            className="absolute right-2 bg-black text-white text-xs py-1 px-2 rounded-lg
        "
          >
            User
          </span>
        </button>
      </Link>

      <Link>
      <button
        className={`relative text-start w-full hover:bg-gray-200  duration-300 ease-in-out py-2 px-3 rounded-lg text-red-500`}
        onClick={()=>handleSignOut()}
      >
          {" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>{" "}
          &nbsp; Log Out{" "}
      </button>
      </Link>
    </div>
  );
}
