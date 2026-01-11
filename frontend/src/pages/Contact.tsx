import {useState, useRef} from 'react';
import emailjs from '@emailjs/browser';
import {Send, Mail, User, MessageSquare} from 'lucide-react';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ganti dengan ID dari dashboard EmailJS kamu
    emailjs
      .sendForm('service_kxbpljj', 'template_ppi4v11', form.current!, 'GvsV6M7WpLTGznCp1')
      .then(() => {
        alert('Pesan berhasil dikirim! 🚀');
        form.current?.reset();
      })
      .catch((err) => alert('Gagal mengirim: ' + err.text))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <p className="text-slate-500 mt-2">Punya pertanyaan atau tawaran kerja? Kirim pesan saja!</p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <User size={16} /> Nama
          </label>
          <input type="text" name="user_name" required className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Mail size={16} /> Email
          </label>
          <input type="email" name="user_email" required className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <MessageSquare size={16} /> Pesan
          </label>
          <textarea name="message" rows={5} required className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
        </div>

        <button disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-all active:scale-95 disabled:opacity-50">
          {loading ? (
            'Mengirim...'
          ) : (
            <>
              <Send size={18} /> Kirim Pesan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
