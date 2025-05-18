import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, register as authRegister } from '../api/auth';
import { generateApiKey } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in by trying to generate an API key
        const response = await generateApiKey();
        setUser(response.data.user);
        setApiKey(response.data.apiKey);
      } catch (err) {
        setUser(null);
        setApiKey(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authLogin(credentials);
      setUser(response.data);
      const apiResponse = await generateApiKey();
      setApiKey(apiResponse.data.apiKey);
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authRegister(userData);
      setUser(response.data);
      const apiResponse = await generateApiKey();
      setApiKey(apiResponse.data.apiKey);
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setUser(null);
      setApiKey(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, apiKey, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);