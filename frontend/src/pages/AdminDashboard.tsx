import {useState} from 'react';
import {motion} from 'framer-motion';
import {PlusCircle, Image as ImageIcon, Code, Type, AlignLeft, Link as LinkIcon} from 'lucide-react';

export default function AdminDashboard() {
  // 1. STATE LENGKAP
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [techStack, setTechStack] = useState(''); // Kita input sebagai string, lalu di-convert ke array
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    // Mengubah string "React, Tailwind, Node" menjadi array ["React", "Tailwind", "Node"]
    const techArray = techStack.split(',').map((item) => item.trim());

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          techStack: techArray,
          link,
        }),
      });

      if (response.ok) {
        alert('✅ Proyek berhasil ditambahkan!');
        // RESET FORM
        setTitle('');
        setDescription('');
        setImageUrl('');
        setTechStack('');
        setLink('');
      } else {
        const errorData = await response.json();
        alert('❌ Gagal: ' + errorData.message);
      }
    } catch (err) {
      alert('❌ Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="text-blue-500" size={28} />
          <h1 className="text-2xl font-bold dark:text-white">Tambah Proyek Baru</h1>
        </div>

        <form onSubmit={handleAddProject} className="space-y-5">
          {/* INPUT JUDUL */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 dark:text-slate-300">
              <Type size={16} /> Judul Proyek
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: E-Commerce App"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
          </div>

          {/* INPUT DESKRIPSI */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 dark:text-slate-300">
              <AlignLeft size={16} /> Deskripsi
            </label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan tentang proyek ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
          </div>

          {/* INPUT IMAGE URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 dark:text-slate-300">
              <ImageIcon size={16} /> URL Gambar
            </label>
            <input
              required
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* INPUT TECH STACK */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 dark:text-slate-300">
                <Code size={16} /> Tech Stack (Pisahkan dengan koma)
              </label>
              <input
                required
                type="text"
                placeholder="React, Node.js, MongoDB"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
              />
            </div>

            {/* INPUT LINK PROYEK */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 dark:text-slate-300">
                <LinkIcon size={16} /> Link Proyek
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2 mt-4">
            {loading ? 'Sedang Menyimpan...' : 'Simpan Proyek'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
