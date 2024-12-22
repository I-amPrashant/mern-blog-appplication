import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [oneMonthAgoUsers, setOneMonthAgoUsers] = useState(0);
  const [lastMonthsPosts, setLastMonthsPosts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setOneMonthAgoUsers(data.oneMonthAgoUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthsPosts(data.lastMonthPost);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.validUser.isAdmin) {
      fetchUsers();
      fetchPosts();
    }
  }, [currentUser]);
  return (
    <div className="flex-grow relative mx-auto max-w-[1000px] px-3 py-8 overflow-y-scroll">
      <div className="flex flex-wrap gap-10 justify-center w-full">
        <div className="flex relative w-[300px] flex-col items-start shadow-lg px-6 rounded-xl py-4">
          <h1 className="text-2xl uppercase">Total Users</h1>
          <h1 className="text-2xl mt-1">{totalUsers}</h1>
          <h2 className="text-sm mt-3">
            <i className="fa-solid fa-arrow-up text-green-500">
              {" "}
              &nbsp;{oneMonthAgoUsers}
            </i>
            &nbsp; Last Month
          </h2>
          <span className="absolute top-5 right-5">
            <i className="fa-solid fa-users"></i>
          </span>
        </div>
        <div className="flex relative w-[300px] flex-col items-start shadow-lg px-6 rounded-xl py-4">
          <h1 className="text-2xl uppercase">Total Posts</h1>
          <h1 className="text-2xl mt-1">{totalPosts}</h1>
          <h2 className="text-sm mt-3">
            <i className="fa-solid fa-arrow-up text-green-500">
              {" "}
              &nbsp;{lastMonthsPosts}
            </i>
            &nbsp; Last Month
          </h2>
          <span className="absolute top-5 right-5">
          <i class="fa-solid fa-signs-post"></i>
          </span>
        </div>
      </div>

      {/* bottom part  */}
      <div className="flex flex-wrap gap-24  w-full justify-center py-5 mt-24">
        <div className="min-w-full max-w-[700px] px-8 py-4 shadow-md rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium ">Recent users</h1>
            <Link
              to={`/dashboard?tab=users`}
              className="px-4 py-1 text-white bg-cyan-500 rounded-md"
            >
              See all{" "}
            </Link>
          </div>

          <table className="mt-6 min-w-full">
                <thead>
                    <tr>
                        <th className="px-5 py-2 text-start  text-lg font-semibold text-gray-600 uppercase tracking-wider">user image </th>
                        <th className="px-5 py-2 text-start text-lg font-semibold text-gray-600 uppercase tracking-wider ">Username </th>
                    </tr>
                </thead>
                {users.map((user)=>{
                    return (
                        <tbody key={user._id} >
                            <tr>
                                <td className="px-5 pt-10"><img src={user.profilePicture} alt={user.username} className="w-[50px] h-[50px] rounded-full"/></td>
                                <td className="px-5 pt-10">{user.username}</td>
                            </tr>
                        </tbody>
                    )
                })}
          </table>
        </div>

        <div className="min-w-full max-w-[700px] px-8 py-4 shadow-md rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium ">Recent posts</h1>
            <Link
              to={`/dashboard?tab=posts`}
              className="px-4 py-1 text-white bg-cyan-500 rounded-md"
            >
              See all{" "}
            </Link>
          </div>

          <table className="mt-6 min-w-full">
                <thead>
                    <tr>
                        <th className="px-5 py-2 text-start  text-lg font-semibold text-gray-600 uppercase tracking-wider">post image </th>
                        <th className="px-5 py-2 text-start text-lg font-semibold text-gray-600 uppercase tracking-wider ">post title  </th>
                        <th className="px-5 py-2 text-start text-lg font-semibold text-gray-600 uppercase tracking-wider ">category </th>
                    </tr>
                </thead>
                {posts.map((post)=>{
                    return (
                        <tbody key={post._id} >
                            <tr>
                                <td className="px-5 pt-10"><img src={post.image} alt='post title' className="w-[50px] h-[50px] rounded-full"/></td>
                                <td className="px-5 pt-10">{post.title}</td>
                                <td className="px-5 pt-10">{post.category}</td>
                            </tr>
                        </tbody>
                    )
                })}
          </table>
        </div>
      </div>
    </div>
  );
}
