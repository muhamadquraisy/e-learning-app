import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const carouselImages = [
    '/murid1.jpg',
    '/murid2.jpg',
    '/murid3.jpg',
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col scroll-smooth">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 shadow-sm bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <h1 className="text-2xl font-extrabold tracking-wide">E-Learning App | Muhamad Quraisy</h1>
        <nav className="space-x-5 font-medium">
          <a href="#fitur" className="hover:underline">Fitur</a>
          <a href="#tentang" className="hover:underline">Tentang</a>
          <Link
            to="/login"
            className="bg-white text-emerald-600 px-4 py-2 rounded hover:bg-gray-100 transition font-semibold"
          >
            Masuk
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-24 px-6 bg-gray-50">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight">
          Platform Digital Pembelajaran <br /> untuk <span className="text-emerald-600">Guru & Murid</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Kelola materi, akses kelas, dan dukung proses belajar yang modern dan menyenangkan!
        </p>
        <Link
          to="/login"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md text-lg transition"
        >
          Mulai Sekarang
        </Link>
      </section>

      {/* CAROUSEL / SLIDE */}
      <section className="bg-white py-16">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Kegiatan Belajar Murid</h3>
        <div className="flex justify-center space-x-4 overflow-x-auto px-4 md:px-10">
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`murid-${idx}`}
              className="h-64 w-80 object-cover rounded-xl shadow hover:scale-105 transition duration-300"
            />
          ))}
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="py-20 bg-gray-50 px-8">
        <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">🚀 Fitur Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            {
              title: 'Upload Materi',
              desc: 'Guru dapat mengunggah file materi (PDF, Gambar, PPT) sesuai kelas & topik.',
              icon: '📂',
            },
            {
              title: 'Manajemen Kelas',
              desc: 'Kelola kelas 7–12, atur kurikulum, dan pantau perkembangan siswa.',
              icon: '📋',
            },
            {
              title: 'Akses Fleksibel',
              desc: 'Platform ringan, mobile-friendly, dan siap diakses kapan saja.',
              icon: '📱',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-emerald-600">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="py-20 bg-white px-8">
        <h3 className="text-3xl font-semibold text-center mb-10 text-gray-800">👨‍🏫 Tentang Platform Ini</h3>
        <p className="max-w-3xl mx-auto text-center text-gray-700 text-lg">
          E-Learning App dirancang khusus untuk mendukung guru dan murid dalam pembelajaran daring.
          Fokus utama adalah kemudahan, kecepatan akses, dan tampilan yang ramah pengguna untuk mapel <strong>Informatika</strong> dan mata pelajaran lainnya.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-emerald-600 text-white text-center text-sm">
        © {new Date().getFullYear()} Dibuat oleh Muhamad Quraisy. E-Learning Quraisy.
      </footer>

      {/* SCROLL TO TOP BUTTON */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition"
          aria-label="Kembali ke atas"
        >
          ↑
        </button>
      )}
    </div>
  );
}