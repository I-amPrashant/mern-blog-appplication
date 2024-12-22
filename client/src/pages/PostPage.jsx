import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(()=>{
    try {
        const fetchRecentPosts=async()=>{
          const res=await fetch(`/api/post/getPosts?limit=3`);
          const data=await res.json();

          if(res.ok){
            setRecentPosts(data.posts);
          }
        }
        fetchRecentPosts();
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  if (loading)
    return (
      <div className="flex  justify-center items-center min-h-screen">
        <dotlottie-player
          src="https://lottie.host/859b1218-7ddd-41d2-80bf-0eb438856d58/8pY5RiS9CF.lottie"
          background="transparent"
          speed="2"
          style={{ height: "100px", width: "100px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );

  return (
    <div className="min-h-screen max-h-screen overflow-y-scroll flex flex-col gap-14 items-center px-5 py-20">
      <h1 className="text-3xl font-serif lg:text-4xl max-w-[700px] text-center px-4">
        {post && post.title}
      </h1>
      <Link to={`/search?catagory=${post && post.category}`}>
        <button className="shadow-[#818181]  shadow-sm px-4 py-2 rounded-xl text-xs font-semibold">
          {post && post.category}
        </button>
      </Link>

      <div className="max-h-[400px] md:max-h-[500px] max-w-[800px] flex flex-col gap-4 items-center relative w-full ">
        <img
          src={post && post.image}
          alt={post && post.title}
          className="h-full w-full min-h-[300px]  object-cover"
        />
        <div className="flex justify-between w-full pb-4 border-b italic text-slate-400">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="max-w-[800px] text-center post-content"
      ></div>

      <CommentSection postId={post && post._id} />

      <div className="mt-10 flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl font-semibold">Recent Articles</h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
            {recentPosts?.map((post)=>{
              return (
                <PostCard key={post._id} post={post}/>
              )
            })}
        </div>
      </div>
    </div>
  );
}
