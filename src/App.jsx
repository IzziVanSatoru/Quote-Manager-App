import { useEffect, useState } from 'preact/hooks';
import QuoteBox from './components/QuoteBox';
import ShowQuotes from './components/ShowQuotes';
import ButtonPopUp from './components/ButtonPopUp';
import Export from './components/Export';
import Scan from './components/Scan';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const { data } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    setQuotes(data || []);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const styles = {
    appWrapper: {
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#0f172a',
      fontFamily: 'sans-serif',
      color: '#fff',
    },
    section: { marginBottom: '3rem' },
    header: { textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' },
    emojiWrapper: { display: 'flex', justifyContent: 'center', marginTop: '2rem' },
  };

  return (
    <div style={styles.appWrapper}>
      <h1 style={styles.header}>✨ Quote Generator All-in-One ✨</h1>

      <div style={styles.section}>
        <QuoteBox onAdd={fetchQuotes} />
      </div>

      <div style={styles.section}>
        <ShowQuotes quotes={quotes} />
      </div>

      <div style={styles.emojiWrapper}>
        <ButtonPopUp />
      </div>

      <div style={styles.section}>
        <Export />
      </div>

      <div style={styles.section}>
        <Scan />
      </div>
    </div>
  );
}
