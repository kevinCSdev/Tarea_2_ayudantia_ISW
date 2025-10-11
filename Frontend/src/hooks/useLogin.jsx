import { useState } from 'react';

const useLogin = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const errorData = (dataMessage) => {
    if (dataMessage) {
      if (dataMessage.toLowerCase().includes('email')) {
        setErrorEmail(dataMessage);
      } else if (dataMessage.toLowerCase().includes('password') || dataMessage.includes('contraseña')) {
        setErrorPassword(dataMessage);
      }
    }
  };

  const handleInputChange = () => {
    setErrorEmail('');
    setErrorPassword('');
  };

  return { errorEmail, errorPassword, errorData, handleInputChange };
};

export default useLogin;
