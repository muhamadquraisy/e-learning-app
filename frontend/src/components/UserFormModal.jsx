import { useState, useEffect } from 'react';

export default function UserFormModal({ visible, onClose, onSubmit, editingUser }) {
  const [form, setForm] = useState({ nama: '', email: '', role: '', password: '', kelas: '' });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.role) return;
    onSubmit(form);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{editingUser ? 'Edit' : 'Tambah'} Pengguna</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="nama" onChange={handleChange} value={form.nama} placeholder="Nama" className="w-full p-2 border rounded" required />
          <input name="email" onChange={handleChange} value={form.email} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
          <select name="role" onChange={handleChange} value={form.role} className="w-full p-2 border rounded" required>
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="guru">Guru</option>
            <option value="murid">Murid</option>
          </select>
          {form.role === 'murid' && (
            <input name="kelas" onChange={handleChange} value={form.kelas} placeholder="Kelas" className="w-full p-2 border rounded" required />
          )}
          {!editingUser && (
            <input name="password" onChange={handleChange} value={form.password} placeholder="Password" type="password" className="w-full p-2 border rounded" required />
          )}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-600">Batal</button>
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">{editingUser ? 'Update' : 'Tambah'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}