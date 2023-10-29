import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blog, setBlog] = useState({
        title: '',
        content: '',
    });
    const id = useParams().id
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/blogs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlog(data.result)
                } else {
                    navigate('/login')
                }
            })
    },[id]);

    return (
        <div className='text-white'>
            <h1 className="text-3xl">{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    )

}

export default Blog;