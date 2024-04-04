import React, { useState } from 'react';
import '../styles/StaffLogin.css';
import Layout  from '../components/Layout';


const StaffLogin = () => {
  // State for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Basic validation
    if (username === 'staff' && password === 'password') {
      // Redirect or perform any action upon successful login
      alert('Login successful!');
      // For example, redirect to another page
      // history.push('/dashboard');
    } else {
      // Display error message
      setError('Invalid username or password.');
    }
  };

  return (
    <Layout>
        <div className="login-container"> {/* Add a class for styling */}
      <h2>Staff Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Add a class for styling */}
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Add a class for styling */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group"> {/* Add a class for styling */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button> {/* Add a class for styling */}
      </form>
    </div>
    </Layout>
  );
};

export default StaffLogin;
