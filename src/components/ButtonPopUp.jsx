import { useState } from 'preact/hooks';

export default function ButtonPopUp() {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleClick = () => {
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1000);
  };

  const styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
    },
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#f59e0b',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '250px',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
    },
    emojiPop: {
      position: 'absolute',
      top: showEmoji ? '-40px' : '-20px',
      left: '50%',
      transform: 'translateX(-50%) scale(' + (showEmoji ? '1' : '0.5') + ')',
      fontSize: '2rem',
      opacity: showEmoji ? 1 : 0,
      pointerEvents: 'none',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleClick}>
        😊 Click Me!
      </button>
      <div style={styles.emojiPop}>
        {showEmoji && '💖'}
      </div>
    </div>
  );
}
