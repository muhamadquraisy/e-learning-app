import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice'; // pastikan path sesuai

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 🧠 Tambahkan ini

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Simpan ke localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('nama', user.nama);
      localStorage.setItem('id', user._id);

      // ✅ Simpan ke Redux
      dispatch(loginSuccess({ user, token }));

      // Redirect sesuai role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'guru') {
        navigate('/guru/dashboard');
      } else if (user.role === 'murid') {
        navigate('/murid/dashboard');
      }
    } catch (error) {
      alert('Login gagal! Periksa kembali email dan password.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F7F7]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#007C91]">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded bg-[#1e293b] text-white placeholder-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded bg-[#1e293b] text-white placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#008B8B] hover:bg-[#006f6f] text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}