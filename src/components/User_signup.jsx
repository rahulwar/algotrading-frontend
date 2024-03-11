import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './style/User_signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';  



const UserSignup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender , setGender] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");

  const handleFullNameChange = (e) => {
    const value = e.target.value;

    // Validate that the name contains only alphabets
    if (/^[a-zA-Z ]*$/.test(value)) {
      setFullName(value);
      setFullNameError("");
    } else {
      setFullNameError("Name should contain only alphabets");
    }
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;


    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setContactNumber(value);
      setContactNumberError("");
    } else {
      setContactNumberError("Contact number should be numeric and have a maximum of 10 digits");
    }
  };

  

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

  
    setPasswordError("");

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', {
        username: email, // Assuming email is used as the username
        email,
        mobile_no: contactNumber,
        password,
        gender,
        first_name: fullName.split(" ")[0],
        last_name: fullName.split(" ")[1] || "",
      });

      // Assuming the backend returns user data in the response
      console.log('User created:', response.data);

      // Redirect or handle success as needed
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }

    
  };


  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-0 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-1 mx-md-1">
                    <div className="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: '185px' }} alt="logo" />
                      <h4 className="mt-1 mb-2 pb-1">Get Started</h4>
                    </div>
                    <form>
                      <p>It's free to signup and only takes a minute.</p>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form2Example11" style={{ marginBottom: '2px' }}>Full name</label>
                        <input type="text" id="form2Example11" className="form-control" placeholder="Please enter full name" name="name" value={fullName} onChange={handleFullNameChange} />
                        {fullNameError && <div className="text-danger">{fullNameError}</div>}
                      </div>

                      <div className="form-outline mb-2 my-1">
                        <label className="form-label" htmlFor="form2Example22" style={{ marginBottom: '2px' }}>Contact Number</label>
                        <input type="text" id="form2Example22" className="form-control" name="number" value={contactNumber} onChange={handleContactNumberChange} />
                        {contactNumberError && <div className="text-danger">{contactNumberError}</div>}
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form2Example33" style={{ marginBottom: '2px' }}>Email</label>
                        <input type="email" id="form2Example33" className="form-control" name="email" placeholder="Please enter email Id " value={email} onChange={e => setEmail(e.target.value)}/>
                        
                        </div>

                        <div className="form-outline mb-2 ">
                          <input onChange={e => setGender(e.target.value)} className="ml-5" type="checkbox" id="male" name="gender" value="male"/>
                          <label for="male">Male</label>
                          <input onChange={e => setGender(e.target.value)} className="ml-5" type="checkbox" id="female" name="gender" value="female"/>
                          <label for="female">Female</label>
                          <input onChange={e => setGender(e.target.value)} className="ml-5" type="checkbox" id="other" name="gender" value="other"/>
                          <label for="other">Other</label>
                       </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form2Example44" style={{ marginBottom: '2px' }}>Password</label>
                        <input type="password" id="form2Example44" name="password" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} />
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="form2Example55" style={{ marginBottom: '2px' }}>Confirm Password</label>
                        <input type="password" id="form2Example55" name="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                      </div>

                      {passwordError && <div className="text-danger">{passwordError}</div>}

                      <div className="text-center pt-1 mb-3 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" onClick={handleSignUp}>Sign up</button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-1" style={{ marginBottom: '2px' }}>Already have an account </p>
                        <Link to="/UserLogin"> <button type="button" className="btn btn-outline-danger">Login</button></Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default UserSignup;
