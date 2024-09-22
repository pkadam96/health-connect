import img from '../../public/assets/hero-section.jpg';

const LandingPage = () => {
    return (
        <>  
            {/* Hero Section */}
            <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
                <div className="flex flex-col items-start justify-center h-full text-white bg-black bg-opacity-50">
                    <div className="mx-28 mt-24">
                        <h1 className="text-6xl font-bold mb-8" style={{ lineHeight: "60px" }}>Changing the Way You <br /> Receive <span className=' bg-clip-text text-transparent bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8]'>Healthcare</span></h1>
                        <p className="text-2xl mb-10">Experience a new era of healthcare. No more waiting rooms <br /> or lengthy processes. Get the care you need, whenever and <br /> wherever you are.</p>
                        <div>
                            <button className="px-10 py-4 text-xl rounded-lg bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8]">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Book Appointment */}
            <div>
                <div>
                    
                </div>
                <div></div>
            </div>
        </>
    );
};

export { LandingPage };
