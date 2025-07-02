export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="w-full bg-white rounded-xl overflow-hidden">
      <thead className="bg-teal-600 text-white">
        <tr>
          <th className="text-left px-6 py-3">Nama</th>
          <th className="text-left px-6 py-3">Email</th>
          <th className="text-left px-6 py-3">Role</th>
          <th className="text-left px-6 py-3">Kelas</th>
          <th className="text-center px-6 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id} className="border-b">
            <td className="px-6 py-4">{user.nama}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4 capitalize">{user.role}</td>
            <td className="px-6 py-4">{user.kelas || '-'}</td>
            <td className="px-6 py-4 text-center">
              <button onClick={() => onEdit(user)} className="bg-yellow-400 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => onDelete(user)} className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}