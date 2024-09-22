import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../../public/assets/logo-transparent.png';
import '../style/login.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSlide = (isLogin) => {
    setIsLogin(isLogin);
    setFormData({ email: '', password: '', firstName: '', lastName: '', role: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8200/user/login', {
        email: formData.email,
        password: formData.password
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      login(user);
      alert(`Welcome ${user.firstName}`)
      navigate('/');

    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8200/user/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      alert('User registered successfully! You can now log in.');
      handleSlide(true);  // Switch to login after signup

    } catch (error) {
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <div className="wrapper">
        <div className='flex items-center justify-center'>
          <img src={img} alt="Logo" className='w-1/3' />
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLogin}
              onChange={() => handleSlide(true)} />
            <input type="radio" name="slide" id="signup" checked={!isLogin}
              onChange={() => handleSlide(false)} />
            <label htmlFor="login" className="slide login" onClick={() => handleSlide(true)}>Login</label>
            <label htmlFor="signup" className="slide signup" onClick={() => handleSlide(false)}>Signup</label>
            <div className="slider-tab" style={{ left: isLogin ? '0' : '50%' }}></div>
          </div>
          <div className="form-inner" style={{ marginLeft: isLogin ? '0' : '-100%' }}>
            {/* Login Form */}
            <form onSubmit={handleLogin} className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
              </div>
              <div className="pass-link"><a href="#">Forgot password?</a></div>
              {error && <p className="error">{error}</p>}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <a href="#" onClick={(e) => { e.preventDefault(); handleSlide(false); }}>Signup now</a>
              </div>
            </form>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="signup">
              <div className="field">
                <select name="role" value={formData.role} onChange={handleInputChange} className='w-full border border-gray-300 rounded-xl py-3 px-4' required>
                  <option value="">Select Role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <div className="field">
                  <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="field">
                  <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="field">
                <input type="text" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required />
              </div>
              {error && <p className="error">{error}</p>}
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
