import { useNavigate } from "react-router";
import { useState } from "react";
import '../loginSignup/LoginSignup.css'
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
        <div className=" w-md flex flex-col gap-2 p-20 text-blue-700">
            <div className="m-auto text-red-500">{errors.title}</div>
            <input type="text" placeholder="Title" className="input text-center w-md p-2"
                onChange={(e) => {
                    setBlog({
                        ...blog,
                        title: e.target.value
                    })
                }} />
            <div className="m-auto text-red-500">{errors.content}</div>
            <textarea placeholder="Content" className=" input text-center w-md h-[500px]"
                onChange={(e) => {
                    setBlog({
                        ...blog,
                        content: e.target.value
                    })
                }}
            />
            <button className="submit m-auto p-2 mb-20 " onClick={
                () => createBlog()
            }>Create</button>
<br />
<br />
<br />
<br />
        </div>
    );
}

export default NewBlog;