import React, { useState, useEffect } from 'react';
import "../App.css"
const Userdata = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  console.log(userData)

  return (
    <div>
      {userData ? (
        <div className='user-box'>
          <div className="user-container">
          <p><strong>Profile Photo:</strong></p>
          {userData.user.profile_photo && (
            <img src={userData.user.profile_photo} alt="Profile" style={{ width: '100px', height: '100px' ,borderRadius:"30px" }} />
          )}
          <p><strong>Username:</strong> {userData.user.username}</p>
          <p><strong>Email:</strong> {userData.user.email}</p>
          <p><strong>First Name:</strong> {userData.user.f_name}</p>
          <p><strong>Last Name:</strong> {userData.user.l_name}</p>
          <p><strong>Address:</strong> {userData.user.address}</p>
          <p><strong>City:</strong> {userData.user.city}</p>
          <p><strong>Pin:</strong> {userData.user.pin}</p>
          <p><strong>User Type:</strong> {userData.user.user_type_name}</p>
        </div>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
      
    </div>
    
  );
};

export default Userdata;
