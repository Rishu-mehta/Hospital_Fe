import React, { useState } from 'react';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Link } from 'react-router-dom';
import server from '../server';
import { useNavigate } from 'react-router-dom';

const Newregis = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('green');
  const [userType, setUserType] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleError = (e) => {
    setVisible(true);
    setMessage(e);
    setMessageColor('red');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = () => {
      if (!fname || !lname || !email || !username || !password || !cpassword || !address || !city || !pin) {
        handleError('All fields are required');
        return false;
      }
      if (password.length < 6) {
        handleError('Password must be at least 6 characters long.');
        return false;
      }
      if (password !== cpassword) {
        handleError('Passwords do not match.');
        return false;
      }
      return true;
    };

    if (validate()) {
      const formData = new FormData();
      formData.append('f_name', fname);
      formData.append('l_name', lname);
      formData.append('password', password);
      formData.append('email', email.trim());
      formData.append('username', username);
      formData.append('password2', cpassword);
      formData.append('user_type', userType);
      formData.append('profile_photo', profilePhoto);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('pin', pin);

      server.post('users/register/', formData)
        .then((response) => {
          if (response.status === 201) {
            setMessageColor('green');
            setMessage(response.data.msg);
            setVisible(true);
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            setMessageColor('red');
            setMessage(response.data.message);
            setVisible(true);
          }
        })
        .catch((error) => {
          setMessageColor('red');
          setMessage('Something went wrong, please try again');
          setVisible(true);
        });
    }
  };

  return (
    <div>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p style={{ color: messageColor }}>{message}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
      <div className="register-display">
        <div className='register-container'>
          <div className='profile'></div>
          <h1 className='h1'>REGISTRATION</h1>
          <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='credential'>
              <div className='user-name'>
                <div className=''>
                  <div className='flex'>
                    <label htmlFor="fname">First Name</label>
                  </div>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="First Name"
                    className='email'
                    onChange={(e) => setFname(e.target.value.trim())}
                  />
                </div>
                <div className='left-name'>
                  <div className='flex'>
                    <label htmlFor="lname">Last Name</label>
                  </div>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Last Name"
                    className='email'
                    onChange={(e) => setLname(e.target.value.trim())}
                  />
                </div>
              </div>
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abcd@gmail.com"
                className='email'
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="username">Username</label>
              </div>
              <input
                type="tel"
                name="username"
                placeholder="Username"
                className='email'
                onChange={(e) => setUsername(e.target.value.trim())}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="password">Password</label>
              </div>
              <input
                type={passwordType}
                placeholder="Password"
                className='email'
                name="password"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="cpassword">Confirm Password</label>
              </div>
              <input
                type={passwordType}
                placeholder="Confirm Password"
                name="cpassword"
                className='email'
                onChange={(e) => setCpassword(e.target.value.trim())}
              />
            </div>
            <div className="show-password">
              <div>
                <input
                  className=""
                  type="checkbox"
                  onClick={togglePassword}
                />
                Show Password
              </div>
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="profilePhoto">Profile Photo</label>
              </div>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                className='email'
                onChange={(e) => setProfilePhoto(e.target.files[0])}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="address">Address</label>
              </div>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className='email'
                onChange={(e) => setAddress(e.target.value.trim())}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="city">City</label>
              </div>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className='email'
                onChange={(e) => setCity(e.target.value.trim())}
              />
            </div>
            <div className='credential'>
              <div className='flex'>
                <label htmlFor="pin">PIN</label>
              </div>
              <input
                type="number"
                name="pin"
                id="pin"
                placeholder="PIN"
                className='email'
                onChange={(e) => setPin(e.target.value.trim())}
              />
            </div>
            <div className='radio'>
              Create account as :
              <div className='user-input'>
                <input type="radio" name='userType' value="2" onChange={(e) => setUserType(e.target.value)} />Doctor
              </div>
              <div className='user-input'>
                <input type="radio" name='userType' value="1" onChange={(e) => setUserType(e.target.value)} />Patient
              </div>
            </div>
            <button className='regis' type="submit">Register</button>
            <div className='account'>
              <p>Already have an account? <Link to="/">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newregis;
