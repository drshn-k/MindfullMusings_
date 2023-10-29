/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () =>{
        const res = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            });
        
        const data = await res.json();

        if(data.success){
            localStorage.removeItem('isLogged');
            navigate('/login')
        }
    }

    useEffect(() => {
        logout();
    },[navigate])

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default Logout;