import { Component } from 'react';
import { useTranslation } from 'react-i18next';

export default function ErrorBoundary({ children, showError }) {
  return (
    <ErrorBoundaryInner showError={showError}>
      {children}
    </ErrorBoundaryInner>
  );
}

class ErrorBoundaryInner extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          showError={this.props.showError}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, showError }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'GT Maru', sans-serif",
      }}
    >
      <h1 style={{ fontSize: '4rem', color: '#AB4A9A' }}>{t('common.errorBoundary')}</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px' }}>
        {t('common.errorBoundaryTryReload')}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="btn btn--primary"
      >
        {t('common.errorBoundaryReload')}
      </button>
      {showError && (
        <pre
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#18020C',
            color: '#FFEEDB',
            borderRadius: '8px',
            maxWidth: '600px',
            overflowX: 'auto',
            fontSize: '0.8rem',
          }}
        >
          {error?.message}
        </pre>
      )}
    </div>
  );
}