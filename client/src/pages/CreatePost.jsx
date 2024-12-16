import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function CreatePost() {

  const [content, setContent] = useState('');
  const handleEditorChange = (content, editor) => {
    setContent(content);
  }
  console.log(content);

  return (
    <div className='min-h-screen relative flex flex-col items-center mt-[100px] gap-8 mx-auto max-w-[700px] px-5'>
      <h1 className='font-semibold text-4xl'>Create a Post</h1>
      <form action="#" className='flex flex-col gap-4 w-full text-gray-700'>
            <div className='flex gap-4 flex-wrap '>
                <input type="text" placeholder='Title...' className='flex-grow border bg-gray-100 px-4 rounded-lg py-2 outline-none'/>
                <select name="category" id="blog-category" className='w-full sm:w-min outline-none border-[2px] px-3 rounded-lg
                '>
                  <option value="uncategorized">Select a category</option>
                  <option value="javascript">Javascript</option>
                  <option value="typescript">Typescript</option>
                  <option value="react">React</option>
                </select>
            </div>

      {/* image uploader */}
            <div className='flex items-center justify-between flex-wrap p-4 border border-dashed border-gray-400'>
              <input type="file" />
              <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg '>Upload Image</button>
            </div>

            {/* tinymce  */}
            <Editor
      apiKey='xaijnny6zs1solrrw330k6n6u61z1rrin242pz52yz82g15q'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue="Welcome to TinyMCE!"
      onEditorChange={handleEditorChange}
      required
    />
        <button className='w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg '>Create </button>
      </form>
    </div>
  )
}
