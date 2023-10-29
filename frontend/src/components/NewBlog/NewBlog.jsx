import { useNavigate } from "react-router";
import { useState } from "react";

const NewBlog = () => {
    const [blog, setBlog] = useState({
        title: '',
        content: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });

    const navigate = useNavigate();
    const createBlog = () => {
        fetch(`http://localhost:3000/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate('/')
                } else {
                    setErrors(data.errors)
                }
            })
    }

    return (
        <div className="m-auto flex flex-col gap-2 text-blue-700">
            <div className="text-red-500">{errors.title}</div>
            <input type="text" placeholder="Title" className="w-md p-2"
                onChange={(e) => {
                    setBlog({
                        ...blog,
                        title: e.target.value
                    })
                }} />
            <div className="text-red-500">{errors.content}</div>
            <textarea placeholder="Content" className="w-md h-[500px]"
                onChange={(e) => {
                    setBlog({
                        ...blog,
                        content: e.target.value
                    })
                }}
            />
            <button className="p-2 bg-white" onClick={
                () => createBlog()
            }>Create</button>
        </div>
    );
}

export default NewBlog;