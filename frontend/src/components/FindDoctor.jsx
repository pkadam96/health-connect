import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8200/user/doctors');
        const data = await response.json();
        console.log('Fetched doctor details:', data);
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        alert('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = () => {
    navigate('/book-appointment');
  }

  return (
    <div className='mt-32 container mx-auto'>
      <h1 className='text-4xl text-center text-[#2b2447] font-bold m-12 '>Meet Our Doctors</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-32 mb-12'>
        {doctors.map(doctor => (
          <div key={doctor.userId} className='max-w-sm rounded-2xl overflow-hidden bg-gray-200 p-4 border-purple-400 border-2 relative pb-16'>
            <img
              className='w-40 h-40 m-auto rounded-full border-purple-400 border-4'
              src={doctor.user.profilePhoto}
              alt={`${doctor.firstName} ${doctor.lastName}`}
            />
            <div className='p-2'>
              <h3 className='font-bold text-xl mb-2 text-center'>{doctor.user.firstName} {doctor.user.lastName} ({doctor.qualifications})</h3>
              <p className='text-gray-700 text-base text-center'>
                <strong> {doctor.specialization || 'N/A'}</strong>
              </p>
              <p className='text-gray-700 text-base line-clamp-2'>
                {doctor.about || 'No information available'}
              </p>
              <p className='text-gray-700 text-base'>
                <strong>Experience:</strong> {doctor.experience} years
              </p>
              <p className='text-base text-center'>
                <StarRating rating={doctor.ratings || 0} />
              </p>
              <button className='bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8] w-full rounded-lg py-4 mt-4 font-bold text-xl text-white absolute bottom-0 left-0' onClick={handleSubmit}>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export { FindDoctor };
