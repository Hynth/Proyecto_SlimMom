import React from 'react';
import Header from '../components/Header/Header';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <Header currentPage={'Register'} />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;


