import { useState } from 'react';
import img from '../../public/assets/logo.png'
import '../style/login.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleSlide = (isLogin) => {
    setIsLogin(isLogin);
  };

  return (
    <div className='login-container'>
      <div className="wrapper">
        <div className='flex items-center justify-center'>
          <img src={img} alt="" className='w-1/3'/>
        </div>
        {/* <div className="title-text">
          <div className={`title ${isLogin ? 'login' : 'signup'}`}>
            {isLogin ? 'Login' : 'Signup'}
          </div>
        </div> */}
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => handleSlide(true)}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => handleSlide(false)}
            />
            <label
              htmlFor="login"
              className="slide login"
              onClick={() => handleSlide(true)}
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className="slide signup"
              onClick={() => handleSlide(false)}
            >
              Signup
            </label>
            <div className="slider-tab" style={{ left: isLogin ? '0' : '50%' }}></div>
          </div>
          <div className="form-inner" style={{ marginLeft: isLogin ? '0' : '-100%' }}>
            <form action="#" className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="pass-link"><a href="#">Forgot password?</a></div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <a href="#" onClick={(e) => { e.preventDefault(); handleSlide(false); }}>Signup now</a>
              </div>
            </form>
            <form action="#" className="signup">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Confirm password" required />
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Login }