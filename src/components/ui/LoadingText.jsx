import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function LoadingText({ isLoading, text = 'Cargando' }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setExiting(false);
    } else if (visible) {
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 400);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, visible]);

  if (!visible) return null;

  return (
    <div
      className={`loading-text ${exiting ? 'loading-text--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={text}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem 1rem',
        transition: 'opacity 0.4s ease',
        opacity: exiting ? 0 : 1,
      }}
    >
      <span className="loading-text__word">
        {text}...
      </span>
    </div>
  );
}

LoadingText.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
};