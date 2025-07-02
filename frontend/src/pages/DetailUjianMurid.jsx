import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const DetailUjianMurid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soal, setSoal] = useState([]);
  const [current, setCurrent] = useState(0);
  const [jawaban, setJawaban] = useState({});
  const [ragu, setRagu] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (id) loadUjian();
  }, [id]);

  const loadUjian = async () => {
    try {
      const res = await api.get(`/ujian/${id}`); // ✅ tanpa '/api'
      const soalData = res.data.soals || [];
      setSoal(soalData);
      setTimeLeft(res.data.durasi ? res.data.durasi * 60 : 900);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat ujian");
    }
  };

  useEffect(() => {
    if (timeLeft === null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  useEffect(() => {
    const handleBlur = () => {
      api.post('/laporan/tab-out', { ujianId: id, waktu: new Date() });
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [id]);

  const handleChange = (index, value) => {
    setJawaban(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    api.post(`/ujian/${id}/submit`, { jawaban, ragu })
      .then(() => navigate('/murid/ujian'))
      .catch(err => toast.error("Gagal mengirim jawaban"));
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentSoal = soal[current];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Soal {current + 1} dari {soal.length}</h2>
        <span className="text-red-600 font-bold text-xl">{formatTime(timeLeft)}</span>
      </div>

      {currentSoal && (
        <div>
          <p className="text-gray-800 mb-4">{currentSoal.pertanyaan}</p>
          <ul className="space-y-2">
            {(currentSoal.opsi || currentSoal.pilihan || []).map((opt, i) => (
              <li key={i}>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`soal-${current}`}
                    value={opt}
                    checked={jawaban[current] === opt}
                    onChange={() => handleChange(current, opt)}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrent(prev => Math.max(prev - 1, 0))}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Sebelumnya
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setRagu(prev => ({ ...prev, [current]: !prev[current] }))}
                className={`px-4 py-2 rounded ${ragu[current] ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                {ragu[current] ? 'Ragu-ragu' : 'Tandai Ragu'}
              </button>

              {current === soal.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Kirim Jawaban
                </button>
              ) : (
                <button
                  onClick={() => setCurrent(prev => prev + 1)}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                  Selanjutnya
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailUjianMurid;