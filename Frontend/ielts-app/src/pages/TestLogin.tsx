import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as loginService, storeToken, getCurrentUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginService(credentials);
      storeToken(response.token);
      
      const userInfo = getCurrentUser();
      if (userInfo) {
        login(userInfo, response.token);
        const destination = from || `/${userInfo.role.toLowerCase()}/dashboard`;
        navigate(destination, { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}