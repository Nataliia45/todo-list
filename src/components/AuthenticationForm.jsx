import React, { useState } from 'react';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

const AuthenticationForm = ({ handleSignUp, handleSignIn, setAuthFormVisible }) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  const toggleForm = () => {
    setIsSigningUp(!isSigningUp);
    setAuthFormVisible(false); // При зміні форми ховаємо форми реєстрації/входу
  };

  return (
    <div>
      {isSigningUp ? <SignUpForm handleSignUp={handleSignUp} /> : <SignInForm handleSignIn={handleSignIn} />}
      <button onClick={toggleForm}>
        {isSigningUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>
  );
};

export default AuthenticationForm;
