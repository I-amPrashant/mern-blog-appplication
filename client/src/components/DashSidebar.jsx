import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function DashSidebar() {
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col  gap-4 px-6 py-4 bg-slate-100 h-full">
      <Link to="/dashboard?tab=profile">
        <button
          className={`relative text-start w-full hover:bg-gray-200  ${
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
      >
        <Link to="/dashboard?tab=profile">
          {" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>{" "}
          &nbsp; Log Out{" "}
        </Link>
      </button>
      </Link>
    </div>
  );
}
