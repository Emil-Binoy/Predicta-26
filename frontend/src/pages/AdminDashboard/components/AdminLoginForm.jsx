import React, { useState } from 'react';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';

const AdminLoginForm = ({ isLoggingIn, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="gold"
        isLoading={isLoggingIn}
        className="w-full"
      >
        {isLoggingIn ? 'Logging in...' : 'Login Securely 🔒'}
      </Button>
    </form>
  );
};

export default AdminLoginForm;
