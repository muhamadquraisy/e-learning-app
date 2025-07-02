import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userAPI';
import UserFormModal from '../components/UserFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import UserTable from '../components/UserTable';

export default function KelolaPengguna() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const userList = await getUsers(); // getUsers() return array langsung
      setUsers(userList || []);
    } catch (err) {
      console.error('[KelolaPengguna] Gagal memuat data pengguna:', err);
      setError('Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
};


  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editingUser) {
        await updateUser(editingUser._id, form);
      } else {
        await createUser(form);
      }
      setModalVisible(false);
      fetchUsers();
    } catch (err) {
      alert('Gagal menyimpan data pengguna.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser(deleteTarget._id);
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      alert('Gagal menghapus pengguna.');
    }
  };

  const filteredUsers = (users || []).filter(u =>
    u.nama?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Kelola Pengguna</h1>
        <button
          onClick={handleAdd}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          + Tambah Pengguna
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari nama atau role..."
        className="mb-4 w-full p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Memuat data pengguna...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <UserTable
          users={filteredUsers}
          onEdit={(u) => {
            setEditingUser(u);
            setModalVisible(true);
          }}
          onDelete={setDeleteTarget}
        />
      )}

      <UserFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />

      <ConfirmDeleteModal
        visible={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}