import {useState} from 'react';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  // ... state lainnya (description, imageUrl, dll)

  // LOKASI PERSIS handleAddProject
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Token dikirim agar diizinkan backend
      },
      body: JSON.stringify({title, description, imageUrl, techStack: ['React']}),
    });

    if (response.ok) {
      alert('Proyek berhasil ditambah!');
      setTitle(''); // Reset form
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Proyek Baru</h1>
      <form onSubmit={handleAddProject} className="flex flex-col gap-4">
        <input type="text" placeholder="Judul Proyek" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded dark:bg-slate-800" />
        {/* ... input lainnya ... */}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Simpan Proyek
        </button>
      </form>
    </div>
  );
}
