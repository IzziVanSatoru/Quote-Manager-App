import { useEffect, useState } from 'preact/hooks';
import { supabase } from '../lib/supabaseClient';

export default function ShowQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal fetch quotes:', error.message);
      setQuotes([{ id: 'error', quote: '❌ Gagal mengambil data.' }]);
    } else {
      setQuotes(data);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (error) {
      console.error('Gagal menghapus:', error.message);
      return;
    }

    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const styles = {
    wrapper: {
      width: '92%',
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
      padding: '1.2rem',
      borderRadius: '0.75rem',
      fontFamily: 'sans-serif',
      boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    quoteBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem',
      marginBottom: '0.75rem',
      backgroundColor: '#334155',
      borderRadius: '0.5rem',
      fontSize: '0.95rem',
      flexWrap: 'wrap',
    },
    quoteText: {
      flex: '1 1 auto',
      marginRight: '0.75rem',
      wordBreak: 'break-word',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      border: 'none',
      color: 'white',
      padding: '0.4rem 0.75rem',
      borderRadius: '0.4rem',
      cursor: 'pointer',
      fontSize: '0.85rem',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1rem',
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>📋 List Quotes</h2>
      {loading ? (
        <p style={styles.loading}>⏳ Loading quotes...</p>
      ) : quotes.length === 0 ? (
        <p style={styles.loading}>❗ Tidak ada quote ditemukan, mastah 🙏</p>
      ) : (
        quotes.map((item) => (
          <div key={item.id} style={styles.quoteBox}>
            <div style={styles.quoteText}>“{item.quote}”</div>
            <button style={styles.deleteButton} onClick={() => handleDelete(item.id)}>🗑️</button>
          </div>
        ))
      )}
    </div>
  );
}
