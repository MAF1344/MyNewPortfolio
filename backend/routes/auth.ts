import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;

    // 1. Cari user berdasarkan username
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({message: 'User tidak ditemukan'});

    // 2. Cek apakah password benar
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message: 'Password salah'});

    // 3. Buat Token JWT
    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET || 'secret_key_kamu',
      {expiresIn: '1d'} // Token hangus dalam 1 hari
    );

    res.json({token, message: 'Login Berhasil'});
  } catch (err) {
    res.status(500).json({message: 'Server Error'});
  }
});

router.post('/setup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('malfatih', 10);
    const newUser = new User({
      username: 'admin_fatih',
      password: hashedPassword,
    });
    await newUser.save();
    res.send('Admin User Created!');
  } catch (error) {
    res.status(500).send('Gagal membuat user: ' + error);
  }
});

export default router;
