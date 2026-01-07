import {useState, useEffect} from 'react';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    const testKoneksi = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/halo');
        const data = await response.json();

        console.log('--- TEST KONEKSI ---');
        console.log('Status:', response.status);
        console.log('StatusDB:', data.databaseStatus);
        console.log('Data dari Backend:', data.pesan);
      } catch (error) {
        console.error('Gagal terhubung ke backend:', error);
      }
    };

    testKoneksi();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
