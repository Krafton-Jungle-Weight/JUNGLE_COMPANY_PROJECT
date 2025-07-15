import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginStatus() {
  const { username, login, logout, register } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await login(form.username, form.password);
      alert('로그인 성공!');
    } catch (err) {
      alert('로그인 실패');
    }
  };

  const handleRegister = async () => {
    try {
      await register(form.username, form.password);
      alert('회원가입 성공! 이제 로그인하세요.');
    } catch (err) {
      alert('회원가입 실패');
    }
  };

  if (username) {
    return (
      <div>
        <strong>{username}</strong>님 환영합니다!
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}

export default LoginStatus;
