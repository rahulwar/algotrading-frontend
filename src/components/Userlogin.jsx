import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/UserLogin.css';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [login, setLogin] = useState([]); 
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validateMobile = () => {
    if (!mobile) {
      setMobileError('Mobile number is required');
    } else {
      setMobileError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:1000/')
      .then((res) => {
        console.log('API Response:', res.data);
        setLogin(res.data);
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  const handleSubmit = async () => {
    validateEmail();
    validateMobile();
    validatePassword();

    if (!emailError && !mobileError && !passwordError) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create', {
          username: email, // Assuming email is used as the username
          password,
        });

        // Assuming the backend returns a token on successful authentication
        console.log('Authentication successful! Token:', response.data.access);
        localStorage.clear();
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = 
                                        `Bearer ${response.data['access']}`;

        // Show an alert for demonstration purposes
        alert('Login successful');
      } catch (error) {
        console.error('Authentication error:', error);

        // Show an alert for demonstration purposes
        alert('Authentication failed');
      }
    }
  };


  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Welcome Back</h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className={`form-control ${emailError ? 'is-invalid' : ''}`}
                          placeholder="Enter your Email Address"
                          value={email}
                          onBlur={validateEmail}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example12">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          id="mobile"
                          className={`form-control ${mobileError ? 'is-invalid' : ''}`}
                          placeholder="Enter your Mobile Number"
                          value={mobile}
                          onBlur={validateMobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        {mobileError && <div className="invalid-feedback">{mobileError}</div>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                          placeholder="Password"
                          value={password}
                          onBlur={validatePassword}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Log in
                        </button>
                      
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to="/User-signup"> <button type="button" className="btn btn-outline-danger">Create Account</button></Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Algotrading</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
