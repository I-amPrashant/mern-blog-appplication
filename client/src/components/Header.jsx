import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const [navLinkClick, setNavLinkClick] = useState("");
  const [isNavCollapse, setIsNavCollapse] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [dropDownActive, setDropDownActive] = useState(false);
  const [darkActive, setDarkActive] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();



  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsNavCollapse(false);
    });
  }, []);

    const handleSignOut=async()=>{
      setDropDownActive(false);
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
    <div className="relative">
      {/* header component */}
      <div
        className={`overflow-hidden relative border-b-[2px] duration-300 ease-in-out h-[100px] ${
          isNavCollapse && "h-[250px]"
        }`}
      >
        <div
          className={`z-50 flex py-8 px-2 sm:px-4 md:px-8 justify-between items-center max-w-[1400px] mx-auto 
            `}
        >
          {/* logo  */}
          <div className="h-10 w-10">
            <img src={Logo} alt="logo" className="h-full w-full scale-[3]" />
          </div>

          {/* search  */}
          <div className="border border-gray-400 rounded-xl flex items-center px-3 py-2">
            <input
              type="text"
              id="search"
              className="hidden sm:block outline-none border-none bg-transparent"
              placeholder="Search..."
            />
            <label htmlFor="search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
          </div>

          {/* nav links  */}
          <div className="absolute top-[100px] left-4 lg:relative lg:top-0 lg:left-0">
            <ul className="flex flex-col gap-5 lg:flex-row  lg:gap-10">
              <li
                className={`cursor-pointer ${
                  navLinkClick === "Home" && "text-blue-500"
                } hover:text-blue-500 duration-200 ease-in-out`}
                onClick={() => setNavLinkClick("Home")}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  navLinkClick === "About" && "text-blue-500"
                } hover:text-blue-500 duration-200 ease-in-out`}
                onClick={() => setNavLinkClick("About")}
              >
                <Link to="/About">About</Link>
              </li>
              <li
                className={`cursor-pointer ${
                  navLinkClick === "Projects" && "text-blue-500"
                } hover:text-blue-500 duration-200 ease-in-out`}
                onClick={() => setNavLinkClick("Projects")}
              >
                <Link to="/Projects">Projects</Link>
              </li>
            </ul>
          </div>

          {/*profile and buttons  */}
          <div className="flex gap-6">
            <button
              className="hidden sm:block border-2
             border-gray-700 border-opacity-10 px-3 py-1 rounded-lg text-lg"
             onClick={()=>{
              setDarkActive(!darkActive);
              dispatch(toggleTheme());
             }}>
              <i className={`fa-solid fa-${darkActive ? "sun" : "moon"}`}></i>
            </button>

            {!currentUser ? (
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg ">
                <Link to="/sign-in">Sign In</Link>
              </button>
            ) : (
              <div className="relative flex justify-center items-center">
                <button
                  className="rounded-full overflow-hidden h-9 w-9 " 
                  onClick={() => setDropDownActive(!dropDownActive)}
                >
                  <img
                    src={currentUser.validUser.profilePicture}
                    alt="profile"
                    className="object-cover"
                  />
                </button>
              </div>
            )}

            {/* hamburger menu  */}

            <button
              className="lg:hidden  text-2xl"
              onClick={() => setIsNavCollapse(!isNavCollapse)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {/* dropdown items  */}
      <div className={`${dropDownActive?'block':'hidden'} absolute top-20 right-20 px-6 py-4 bg-white border-[.5px] border-opacity-50 rounded-xl
       border-gray-400 flex flex-col gap-4 text-gray-900`}>
            <Link to='/dashboard?tab=profile' onClick={() => setDropDownActive(false)}>Profile</Link>
            <button className="text-red-500" onClick={()=>handleSignOut()}>Logout</button>
      </div>
    </div>
  );
}
