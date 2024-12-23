import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const location = useLocation();
  const navigate=useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setPosts(data.posts);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

const handleShowMore=async()=>{
    const numberOfPosts=posts.length;
    const startIndex=numberOfPosts;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery=urlParams.toString();
    const res=await fetch(`/api/post/getposts?${searchQuery}`);
    const data=await res.json();
    if(res.ok){
      setPosts([...posts, ...data.posts]);
      if(data.posts.length<9){
        setShowMore(false);
      }else{
        setShowMore(true);
      }
    }
}

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500 border-opacity-70">
        <form className="flex flex-col gap-8" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex  items-center gap-2">
            <label htmlFor="searchTerm" className="text-xl font-medium whitespace-nowrap"> Search Term:</label>
            <input
              type="text"
              placeholder="Search..."
              name="searchTerm"
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="p-2 border border-cyan-300 rounded-md outline-none"
            />
          </div>
          <div className="flex  items-center gap-2">
            <label htmlFor="searchTerm" className="text-xl font-medium whitespace-nowrap"> Sort:</label>
            <select id="sort" value={sidebarData.sort} onChange ={handleChange} > 
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex  items-center gap-2">
            <label htmlFor="searchTerm" className="text-xl font-medium whitespace-nowrap"> Category:</label>
            <select id="category" value={sidebarData.category}  onChange ={handleChange}  > 
                <option value="uncategorized">Uncategorized</option>
                <option value="reactjs">React js </option>
                <option value="nextjs">Next js</option>
                <option value="javascript">Javascript</option>
            </select>
          </div>

          <button className="p-2 border border-cyan-300 rounded-md hover:bg-gradient-to-tr from-cyan-500 to-blue-500 hover:text-white transition-all duration-300" type='submit'>
            Search
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold p-3 mt-5 sm:border-b border-gray-500">Search Results</h1>

        <div className="p-7 flex flex-wrap gap-4">
            {
              !loading && posts.length===0 && <h1 className="text-xl font-normal p-3 mt-5 ">No posts found.</h1>
            }
            {loading && <p>Loading... </p>}
            {!loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
            {
                showMore && <button onClick={handleShowMore} className="p-2 border border-cyan-300 rounded-md hover:bg-gradient-to-tr from-cyan-500 to-blue-500 hover:text-white transition-all duration-300">Load More</button>
            }
        </div>
      </div>
    </div>
  );
}
