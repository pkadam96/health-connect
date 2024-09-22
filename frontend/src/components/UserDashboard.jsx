import React, { useState, useEffect } from 'react';

// Single Page Component for Dashboard
const UserDashboard = () => {
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8200/user/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const userData = await response.json();
        return userData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div className="text-center text-xl">Loading user data...</div>;
    }

    const { firstName, lastName, email, gender, phoneNumber, dob, appointments } = userData;

    return (
        <div className="min-h-screen py-10 mt-20">
            <h1 className="text-4xl text-center text-[#2b2447] font-bold m-4"> Dashboard</h1>
            <div className="flex mx-32 bg-white p-8 rounded-xl">


                {/* User Info Section */}
                <div className="flex mb-8 w-1/2">
                    <div>
                        <div className='p-8'>
                            <img src="./assets/user.jfif" alt="user" className='w-48 h-48 rounded-full mb-8' />
                            <h2 className='text-3xl font-bold'>{firstName} {lastName}</h2>

                        </div>
                        <p className='text-xl mb-4'><span className="font-bold">Email:</span> {email}</p>
                        <p className='text-xl mb-4'><span className="font-bold">Gender:</span> {gender}</p>
                        <p className='text-xl mb-4'><span className="font-bold">Phone Number:</span> {phoneNumber}</p>
                        <p className='text-xl mb-4'><span className="font-bold">Birth Date:</span> {dob}</p>


                    </div>
                </div>

                {/* Appointments Section */}
                <div>
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.appointmentId} className="w-full bg-gray-200 py-8 px-20 mb-4 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold">Appointment #{appointment.appointmentId}</h3>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <p><span className="font-bold">Doctor:</span> {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                                    <p><span className="font-bold">Department:</span> {appointment.department.departmentName}</p>
                                    <p><span className="font-bold">Reason:</span> {appointment.reason}</p>
                                    <p><span className="font-bold">Status:</span> {appointment.status}</p>
                                    <p><span className="font-bold">Date:</span> {appointment.appointmentDate}</p>
                                    <p><span className="font-bold">Slot:</span> {appointment.slot.startTime} - {appointment.slot.endTime}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            </div>
        </div >
    );
};

export { UserDashboard };
