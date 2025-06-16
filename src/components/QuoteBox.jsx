import { useState } from 'preact/hooks';
import { supabase } from '../lib/supabaseClient';

export default function QuoteBox() {
  const [quote, setQuote] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Loading...');

    const { error } = await supabase.from('quotes').insert({ quote });

    if (error) {
      console.error('Insert error:', error.message);
      setStatus('❌ Gagal menyimpan quote.');
    } else {
      setStatus('✅ Quote berhasil disimpan!');
      setQuote('');
    }
  };

  const styles = {
    container: {
      width: '92%',
      maxWidth: '480px',
      margin: '1.5rem auto',
      padding: '1rem',
      textAlign: 'center',
      background: '#1f2937',
      color: '#fefefe',
      borderRadius: '0.75rem',
      boxShadow: '0 0 12px rgba(0,0,0,0.2)',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      minHeight: '100px',
      padding: '0.75rem',
      fontSize: '0.9rem',
      borderRadius: '0.5rem',
      border: '1px solid #64748b',
      marginBottom: '1rem',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    button: {
      padding: '0.6rem 1.2rem',
      fontSize: '0.9rem',
      borderRadius: '0.5rem',
      backgroundColor: '#10b981',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.2s ease-in-out',
    },
    status: {
      marginTop: '0.8rem',
      fontSize: '0.85rem',
      fontStyle: 'italic',
      color: '#facc15',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add a New Quote</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.input}
          placeholder="Write your quote here..."
          value={quote}
          onInput={(e) => setQuote(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Save Quote
        </button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}
