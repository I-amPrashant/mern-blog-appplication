import {Link} from 'react-router-dom'
export default function PostCard({post}) {
  return (
    <div className='relative group w-full border  h-[400px] overflow-hidden rounded-lg sm:w-[430px]'>
        <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt='post card' className='h-[250px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>
        </Link>
        <div className='p-2 flex flex-col gap-2'>
                <p className='text-lg font-semibold'>{post.title}</p>
                <span className='italic text-sm '>{post.category}</span>
                <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-50px] left-0 right-0 bg-black text-white py-2 text-center transition-all duration-300 rounded-md !rounded-tl-none m-2'>
                Read More</Link>
        </div>
    </div>
  )
}
