import { useState } from "react";
import img from '../../public/assets/logo-transparent.png'
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="fixed top-0 w-full text-white flex items-center gap-8 px-12 py-2 lg:px-24 border-b border-inherit frosted-glass z-30 bg-[#2b2447]">
                <img src={img} alt="" className="w-28" />
                <div className={`fixed top-16 left-0 h-screen-full w-full lg:h-full bg-black flex gap-4 flex-col items-center justify-center transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} lg:static lg:bg-transparent lg:flex-row lg:justify-end lg:translate-x-0 z-70 `}>
                    <ul className="flex flex-col lg:flex-row flex-row gap-24">
                        <li className="text-center"><a href="#features">Features</a></li>
                        <li className="text-center"><a href="#roadmap">Roadmap</a></li>
                        <li className="text-center"><a href="#tokenomics">Tokenomics</a></li>
                    </ul>
                    <div>
                        <button className="w-36 px-6 ml-24 pt-3 pb-2.5 sm:px-4 sm:py-3 font-medium rounded bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8]">Login</button>
                    </div>
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className=" fixed top-5 right-5 mx-2 lg:hidden">
                    <span className="hamburger-icon px-4 py-3 frosted-glass rounded-full">{menuOpen ? '✖' : '☰'}</span>
                </button>
            </div>
        </>
    );
}

export { Navbar };


