import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () =>{
      try {
        const res = await fetch(
          `/api/user/getusers?userId=${currentUser.validUser._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length <= 9) {
            setShowMore(false);
          }
        } else {
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (currentUser.validUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.validUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(
        `/api/user/getusers?userId=${currentUser.validUser._id}&startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        setPosts([...users, ...data.users]);
        if (data.users.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      const res = await fetch(
        `/api/user/delete/${userId}/${currentUser.validUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        alert("post has been deleted");
        setPosts(posts.filter((post) => post._id !== userId));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex-grow relative overflow-x-scroll mt-10 md:mt-0">
      {currentUser.validUser.isAdmin && users.length > 0 ? (
        <>
          <table className="w-auto mx-auto mt-4">
            <thead className="shadow-2xl sticky top-0 bg-white">
              <tr>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  Date created{" "}
                </th>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  User image{" "}
                </th>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  Username{" "}
                </th>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  email{" "}
                </th>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  Admin{" "}
                </th>
                <th className="text-start px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">
                  Delete
                </th>
              </tr>
            </thead>

            {users?.map((user, index) => (
              <tbody key={index}>
                <tr className="border-b-[2px]">
                  <td className="px-8 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-4">
                      <img
                        src={user.profilePicture}
                        alt="user-image"
                        className="h-20 w-28 object-cover"
                      />
                  </td>
                  <td className="px-8 py-4 font-semibold text-ellipsis whitespace-nowrap max-w-[900px] overflow-hidden">
               {user.username}
                  </td>
                  <td className="px-8 py-4 text-gray-400">{user.email}</td>
                  <td className="px-8 py-4 text-gray-400">{user.isAdmin?(<i className="fa-solid fa-check text-green-500 font-bold text-2xl"></i>):(<i className="fa-solid fa-xmark text-red-500 font-bold text-2xl"></i>)}</td>
                  <td className="px-8 py-4 text-red-500">
                    <span
                      className="cursor-pointer"
                      onClick={() => handleUserDelete(user._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-2xl text-teal-200 cursor-pointer mx-auto font-bold py-6"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p className="absolute text-4xl font-bold text-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          No posts found
        </p>
      )}
    </div>
  );
}
