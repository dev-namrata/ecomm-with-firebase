import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    const emailVal = e.target.email.value;

    try {
      await sendPasswordResetEmail(auth, emailVal);
      alert('Email sent');
      navigate('/login');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" type="email" placeholder="Enter your email" />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
