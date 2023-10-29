import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/blogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                    setBlogs(data.result)
            });
    }, [])

    return (
        <div>
            <h1 className='text-4xl'>Blog List</h1>
            <div className='flex flex-col'>
                {
                    blogs.map((blog) => {
                        return (
                            <div key={blog._id} className='bg-white'>
                                <h1 className='text-2xl'>{blog.title}</h1>
                                <p>{
                                    blog.content.length > 50 ? blog.content.substring(0, 50) + '...' : blog.content
                                }</p>

                                <Link to={'/blogs/'+blog._id} className='text-blue-900'>Read More</Link>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default BlogList;