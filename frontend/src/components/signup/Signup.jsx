import "./Signup.css";
import email_icon from "../assets/email.png";
import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const login = () => {
    fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('isLogged', true);
          navigate('/')
        } else {
          setErrors(data.errors)
        }
      })
  }


  return (
    <div className="container">
      <div className="header">
        <div className="text">Create an Account</div>
        <div className="underline"></div>
      </div>
      <div>
        {errors.name && <div className="text-center text-red-500">{errors.name}</div>}
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" onChange={(e) => {
              setName(e.target.value)
            }} />
          </div>
        </div>
        <div>
          {errors.email && <div className="text-center text-red-500">{errors.email}</div>}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" onChange={(e) => {
              setEmail(e.target.value)
            }} />

          </div>
        </div>


        <div>
          {errors.password && <div className="text-center text-red-500">{errors.password}</div>}
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </div>
        </div>

        <div className="submit m-auto mt-3">
          <div
            className="submit"
            onClick={() => {
              login();
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
