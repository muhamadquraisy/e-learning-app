export default function ConfirmDeleteModal({ visible, onConfirm, onCancel }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl">
        <p className="mb-4">Yakin ingin menghapus pengguna ini?</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="text-gray-600">Batal</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Hapus</button>
        </div>
      </div>
    </div>
  );
}