import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // 1. Import dotenv

dotenv.config(); // 2. Aktifkan dotenv
console.log('Cek Koneksi String:', process.env.MONGO_CONNECTION_STRING);

const app = express();
const PORT: number = 5000;
const MONGO_URI = process.env.MONGO_CONNECTION_STRING; // Ambil dari .env

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/halo', (req: Request, res: Response) => {
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const dbStatus = mongoose.connection.readyState;
  const statusName = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  res.json({
    pesan: 'Halo dari Express!',
    databaseStatus: statusName[dbStatus],
  });
});

// Koneksi Database & Jalankan Server
if (!MONGO_URI) {
  console.error('❌ Error: MONGO_CONNECTION_STRING tidak ditemukan di file .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected...');
    // Jalankan server HANYA SETELAH database terkoneksi
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Gagal koneksi database:', err.message);
  });
