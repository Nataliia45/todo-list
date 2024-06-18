import React from 'react';
import SignUpForm from './SignUpForm';

const ParentComponent = () => {
  const handleSignUp = (values) => {
    console.log('Form data', values);
    // Тут можна додати логіку для відправки даних на сервер
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm handleSignUp={handleSignUp} />
    </div>
  );
};

export default ParentComponent;
