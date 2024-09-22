import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login'
import { BookAppointment } from '../components/BookAppointment'
import { FindDoctor } from '../components/FindDoctor';
import { LandingPage } from '../components/LandingPage';
import { UserDashboard } from '../components/UserDashboard';

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/find-doctor" element={<FindDoctor />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
        </>
    )
}
export { AllRoutes }