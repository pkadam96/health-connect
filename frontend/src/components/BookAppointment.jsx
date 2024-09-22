import { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    reason: ''
  });

  // Fetch departments on component mount
  useEffect(() => {
    axios.get('http://localhost:8200/department/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  // Fetch doctors when a department is selected
  useEffect(() => {
    if (selectedDepartment) {
      axios.get(`http://localhost:8200/user/doctors/${selectedDepartment}`)
        .then(response => setDoctors(response.data))
        .catch(error => console.error('Error fetching doctors:', error));
    }
  }, [selectedDepartment]);

  // Fetch slots when a doctor and appointment date are selected
  useEffect(() => {
    if (selectedDoctor && appointmentDate) {
      const formattedDate = new Date(appointmentDate).toISOString().split('T')[0];
      axios.get(`http://localhost:8200/slot/slots/${selectedDoctor}?date=${formattedDate}`)
        .then(response => setSlots(response.data))
        .catch(error => {
          if (error.response) {
            console.error('Error fetching slots:', error.response.data);
          } else {
            console.error('Error fetching slots:', error.message);
          }
        });
    }
  }, [selectedDoctor, appointmentDate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const appointmentData = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      deptId: selectedDepartment,
      doctorId: selectedDoctor,
      appointmentDate,
      slotId: selectedSlot,
      reason: formData.reason,
    };

    try {
      const response = await axios.post('http://localhost:8200/appointment/book-appointment', appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Appointment booked successfully!');
        setFormData({
          name: '',
          age: '',
          gender: '',
          reason: ''
        });
        setSelectedDepartment('');
        setSelectedDoctor('');
        setAppointmentDate('');
        setSelectedSlot('');
        setSlots([]);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error booking appointment:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error('Error booking appointment:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="mt-32 container relative">
      <h1 className="text-4xl text-center text-[#2b2447] font-bold m-4 ">Book an Appointment</h1>
      <div className='flex mx-20 my-8'>
        <div className='w-4/5'>
          <div className="appointment-form space-y-4 rounded-2xl p-8 border-blue border-2 w-2/3 ml-12">
            <input
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex space-x-4">
              <input
                type='number'
                placeholder='Age'
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="block w-1/2 p-2 border border-gray-300 rounded"
                required
              />
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="block w-1/2 p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setDoctors([]);
                setSelectedDoctor('');
                setSlots([]);
              }}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>

            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={selectedDoctor}
              onChange={(e) => {
                setSelectedDoctor(e.target.value);
                setSlots([]);
              }}
              disabled={!selectedDepartment}
            >
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc.userId} value={doc.userId}>
                  {doc.user.firstName} {doc.user.lastName}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="block w-full p-2 border border-gray-300 rounded"
              value={appointmentDate}
              onChange={(e) => {
                setAppointmentDate(e.target.value);
                setSlots([]);
              }}
              disabled={!selectedDoctor}
            />

            <select
              className="block w-full p-2 border border-gray-300 rounded"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={!appointmentDate}
            >
              <option value="">Select Slot</option>
              {slots.map(slot => (
                <option key={slot.slotId} value={slot.slotId}>
                  {slot.startTime} To {slot.endTime}
                </option>
              ))}
            </select>

            <textarea
              className="block w-full p-2 border border-gray-300 rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for appointment"
              disabled={!selectedSlot}
            />

            <button
              className="w-full bg-gradient-to-r from-[#9E6EE5] to-[#FA75F8] text-white text-lg cursor-pointer font-semibold p-2 rounded hover:bg-blue-600"
              disabled={!selectedSlot || !reason}
              onClick={handleSubmit}
            >
              Book Appointment
            </button>
          </div>
        </div>
        <div className='w-2/5 absolute right-12'>
          <img src="/assets/book-appointment.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export { BookAppointment };
