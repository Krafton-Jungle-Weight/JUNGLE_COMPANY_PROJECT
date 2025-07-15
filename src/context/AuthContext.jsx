import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios'; // axios 인스턴스 (JWT 자동 첨부용)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  // ✅ 앱 로딩 시 로그인 상태 확인
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');

    if (savedToken && savedUsername) {
      // 백엔드에 /me 요청해서 JWT 유효한지 확인
      api.get('/api/auth/me')
        .then(res => {
          setUsername(res.data); // 서버가 응답한 사용자명 사용
          setToken(savedToken);
        })
        .catch(err => {
          console.warn('JWT 만료 또는 유효하지 않음');
          logout();
        });
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post('/api/auth/login', { username, password });
    const jwt = res.data;
    localStorage.setItem('username', username);
    localStorage.setItem('token', jwt);
    setUsername(username);
    setToken(jwt);
  };

  const register = async (username, password) => {
    await api.post('/api/auth/register', { username, password });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername('');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
