import { useState, useContext } from "react";
import img from '../../public/assets/logo-transparent.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="fixed top-0 w-full text-white flex items-center gap-8 px-12 py-2 lg:px-24 border-b border-inherit frosted-glass z-30 bg-[#2b2447]">
            <img src={img} alt="Logo" className="w-28" />
            <div className={`fixed top-16 left-0 h-screen-full w-full lg:h-full bg-black flex gap-4 flex-col items-center justify-center transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} lg:static lg:bg-transparent lg:flex-row lg:justify-end lg:translate-x-0 z-70`}>
                <ul className="flex flex-col lg:items-center lg:justify-center lg:flex-row flex-row gap-20">
                    <li className="text-center"><Link to="/find-doctor">Find Doctor</Link></li>
                    <li className="text-center"><Link to="/book-appointment">Book Appointment</Link></li>
                    <li className="flex items-center relative">
                        {user && (
                            <div className="flex items-center cursor-pointer" onClick={toggleMenu} >
                                <span className="mr-2">{user.firstName}</span>
                                <div className="relative">
                                    <button className="flex items-center">
                                        <i class="fa-solid fa-circle-user fa-2xl"></i>
                                    </button>
                                    {menuOpen && (
                                        <div className="absolute right-0 mt-4 bg-white text-black rounded shadow-lg">
                                            <Link to="/dashboard" className="block px-8 py-2 hover:bg-gray-200">Dashboard</Link>
                                            <button onClick={handleLogout} className="block w-full text-red-500 text-left px-8 py-2 hover:bg-red-200">Logout</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {!user && (
                            <Link to='./login'>
                                <button className="w-36 px-6 pt-3 pb-2.5 sm:px-4 sm:py-3 font-medium rounded bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8]">Login</button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-5 right-5 mx-2 lg:hidden">
                <span className="hamburger-icon px-4 py-3 frosted-glass rounded-full">{menuOpen ? '✖' : '☰'}</span>
            </button>
        </div>
    );
};

export { Navbar };
