import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser.validUser._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
        }
      } catch (err) {
        console.log(err.message)
      }
    };

    if (currentUser.validUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.validUser._id]);
  return (
    <div className="flex-grow relative overflow-x-scroll mt-10 md:mt-0">
      {currentUser.validUser.isAdmin && posts.length > 0 ? (
        <table className="w-auto mx-auto mt-4">
          <thead className="shadow-2xl">
            <tr>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">Date updated </th>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">Post imaege </th>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">post title </th>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">category  </th>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">delete  </th>
              <th className="px-8 py-4 font-semibold tracking-normal uppercase text-nowrap">edit  </th>
            </tr>
          </thead>

          {posts?.map((post, index)=>(
            <tbody key={index}>
              <tr  className="border-b-[2px]">
                <td className="px-8 py-4">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="px-8 py-4"><Link to={`/post/${post.slug}`}>
                <img src={post.image} alt="post-image" className="h-20 w-28 object-cover"/>
                </Link></td>
                <td className="px-8 py-4 font-semibold text-ellipsis whitespace-nowrap max-w-[900px] overflow-hidden hover:text-cyan-500 hover:underline duration-200 ease-in ">
                  <Link to={`/post/${post.slug}`}>{post.title.trim()}</Link></td>
                  <td className="px-8 py-4 text-gray-400">{post.category}</td>
                  <td className="px-8 py-4 text-red-500">Delete</td>
                  <td className="px-8 py-4 text-cyan-400">
                    <Link to={`/update-post/${post.slug}`}>
                    update
                    </Link>
                  </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <p className="absolute text-4xl font-bold text-gray-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          No posts found
        </p>
      )}
    </div>
  );
}
