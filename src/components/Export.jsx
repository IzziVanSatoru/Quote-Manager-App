import { useEffect, useState } from 'preact/hooks';
import { supabase } from '../lib/supabaseClient';

export default function Export() {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    async function generateReadme() {
      const { data } = await supabase.from('quotes').select('*');
      const markdown = data.map((q, i) => `> ${i + 1}. ${q.quote}`).join('\n');
      const template = `# 📜 Quote Collection\n\n${markdown}\n\n---\nGenerated with izzi van.`;
      setReadmeContent(template);
    }
    generateReadme();
  }, []);

  const downloadFile = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const styles = {
    container: {
      width: '95%',
      maxWidth: '480px',
      margin: '1rem auto',
      fontFamily: 'sans-serif',
      padding: '0.8rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.75rem',
      boxShadow: '0 0 6px rgba(0,0,0,0.1)',
    },
    heading: {
      fontSize: '1rem',
      marginBottom: '0.75rem',
      textAlign: 'center',
    },
    area: {
      width: '100%',
      height: '180px',
      padding: '0.6rem',
      fontFamily: 'monospace',
      fontSize: '0.85rem',
      border: '1px solid #cbd5e1',
      borderRadius: '0.4rem',
      resize: 'vertical',
      backgroundColor: '#fff',
    },
    button: {
      display: 'block',
      margin: '0.8rem auto 0',
      padding: '0.4rem 1rem',
      backgroundColor: '#0f172a',
      color: '#fff',
      border: 'none',
      borderRadius: '0.4rem',
      cursor: 'pointer',
      fontSize: '0.85rem',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Export Quotes to README</h2>
      <textarea readOnly style={styles.area} value={readmeContent} />
      <button style={styles.button} onClick={downloadFile}>
        ⬇️ Download README.md
      </button>
    </div>
  );
}
