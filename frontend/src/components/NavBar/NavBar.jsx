import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-lg flex gap-2 bg-white p-2">
            <Link to="/" className="text-blue-700">Home</Link>
            <Link to="/newblog" className="text-blue-700">New Blog</Link>
            {localStorage.getItem('isLogged') && (
                <Link to="/login" className="text-blue-700">Login</Link>
            )}
            {
                !localStorage.getItem('isLogged') && (
                    <Link to="/logout" className="text-blue-700"
                    onClick={() => {
                        localStorage.removeItem('isLogged');
                    }}
                    >Logout</Link>
                )
            }
            <Link to="/signup" className="text-blue-700">Signup</Link>
        </nav>
    )
}
export default NavBar;