import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js'; // Import model yang baru dibuat
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import router from './routes/auth.js';
import authRoutes from './routes/auth.js';
import {verifyToken} from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Endpoint untuk cek status
app.get('/api/status', (req: Request, res: Response) => {
  const status = mongoose.connection.readyState;
  const map = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({database: map[status]});
});

// Endpoint untuk mengambil semua project
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({pesan: 'Gagal mengambil data'});
  }
});

// Endpoint untuk menambah project baru
app.post('/api/projects', verifyToken, async (req: Request, res: Response) => {
  try {
    const {title, description, imageUrl, techStack, link} = req.body;

    const newProject = new Project({
      title,
      description,
      imageUrl,
      techStack,
      link,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({pesan: 'Gagal menyimpan data', error: err});
  }
});

const MONGO_URI = process.env.MONGO_CONNECTION_STRING!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected (Status 1)');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ Gagal konek:', err));
