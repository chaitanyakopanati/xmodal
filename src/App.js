import './App.css';
import React, { useState } from 'react';
//  import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [showModal, setShowModal] = useState(false);
  console.log("showModal",showModal)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return false;
    }

    // Date of birth validation
    const currentDate = new Date();
    const enteredDate = new Date(formData.dob);
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required.';
    } else if (enteredDate > currentDate) {
      alert('Invalid Date of Birth. Please enter a valid date.');
      return false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Reset the form and close modal
      setFormData({
        username: '',
        email: '',
        dob: '',
        phone: ''
      });
      setShowModal(false);
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'modal') {
      handleCloseModal();
      console.log("outsideclick")
    }
  };

  return (
    <div className="App">
       <div>
        <div className='user'>
       <div className='user-detais'>
        
        <h1>User Details Modal</h1>
      <button onClick={handleShowModal}>Open Form</button>
      </div>
      </div>

      {showModal && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && <p>{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
