import express from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';

const app = express();
const PORT: number = 5000;

app.use(cors());
app.use(express.json());

// Menambahkan route sederhana
app.get('/api/halo', (req: Request, res: Response) => {
  res.json({pesan: 'Halo dari Express versi TypeScript!'});
  console.log('Halo ini adalah pesan dari backend');
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
