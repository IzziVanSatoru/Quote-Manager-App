import { QRCodeCanvas } from 'qrcode.react';

export default function Scan() {
  const link = 'https://youtu.be/dQw4w9WgXcQ?si=Dl7kcihXubhdUex5'; // Ganti sesuai kebutuhan

  const styles = {
    card: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '1rem',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    qr: {
      margin: '1rem auto',
    },
    footer: {
      marginTop: '1rem',
      fontSize: '1rem',
      color: '#475569',
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📱 Scan QR pakai HP</h2>
      <div style={styles.qr}>
        <QRCodeCanvas value={link} size={200} bgColor="#ffffff" fgColor="#000000" />
      </div>
      <div style={styles.footer}>
        Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      </div>
    </div>
  );
}
