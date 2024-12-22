import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          return setPosts(data.posts);
        }
        setError(data.message);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 max-w-[1000px] mx-auto px-4 sm:px-7 justify-center h-[500px]">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-500 text-xs sm:text-base">
          explore through various articles and post on different topics.{" "}
        </p>
        <Link to={`/search`} className="text-orange-400">
          View all posts
        </Link>
      </div>

      <div className="flex flex-col gap-6 max-w-[1000px] mx-auto px-4 sm:px-7 py-5">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center">Latest Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={`/search`} className="text-orange-400">
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
