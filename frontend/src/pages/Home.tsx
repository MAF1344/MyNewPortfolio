import {useQuery} from '@tanstack/react-query';

// Definisikan tipe data sesuai Model Backend kamu
interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
}

export default function Home() {
  // Menggunakan React Query untuk fetch data
  const {data, isLoading, error} = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/projects');
      if (!response.ok) throw new Error('Gagal mengambil data dari server');
      return response.json();
    },
  });

  // 1. Loading State
  if (isLoading) return <div className="text-center py-20 animate-pulse">Memuat proyek...</div>;

  // 2. Error State
  if (error) return <div className="text-center py-20 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-6xl font-black tracking-tight mb-4">
          Hi, Saya <span className="text-blue-500">Muhammad Al Fatih</span>
        </h2>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">Seorang Fullstack Developer yang sedang membangun portofolio dengan Vite, React, dan Express.</p>
      </section>
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="opacity-70 text-lg">Daftar karya yang telah saya buat.</p>
        </div>

        {/* 3. Grid Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((project) => (
            <div key={project._id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 transition-transform hover:scale-105">
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
