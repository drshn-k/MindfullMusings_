import { useState, useEffect } from "react";

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  
  const [me, setMe] = useState({});
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [blogs, setBlogs] = useState([])

  const login = () =>{
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  const showDetails = () =>{
    fetch(`http://localhost:3000/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        setMe(data.data)
      }
    })
  }

  const addBlog = () =>{
    fetch(`http://localhost:3000/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content}),
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      setBlogs([...blogs, data])
    })
  }

  useEffect(() => {
    fetch(`http://localhost:3000/blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      setBlogs(data.data);
    })
  },[]);

  return(
    <h1 className='text-4xl text-center text-red-500'>
      Start blogging!

<br />
      <input type="text" name="email" id="email" placeholder="email" className="border border-red-500"
      onChange={(e) => setEmail(e.target.value)}
      />
      
      <input type="password" name="password" id="password"  placeholder="password" className="border border-red-500"
      onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <button onClick={login}>Login</button>
<br />
      <button onClick={showDetails} className="bg-red-500 text-white">Show my details</button>
      <pre className="border border-red-500">
      {JSON.stringify(me, null, 2)}
      </pre>
      <br/>
      {
        blogs.map(blog => {
          return(
            <div key={blog.id} className="border">
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          )
        })
      }
      <input placeholder="Title" type="text" name="title" id="title" className="border border-red-500" onChange={(e)=>setTitle(e.target.value)}/>
      <textarea name="content" id="" cols="30" rows="10" className="border border-red-500"
      onChange={(e)=>setContent(e.target.value)}></textarea>

<br />
      <button className="bg-red-500 text-white" onClick={addBlog}>Add blog</button>
    </h1>
  )
}

export default App
