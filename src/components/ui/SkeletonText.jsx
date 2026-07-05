import PropTypes from 'prop-types';

export default function SkeletonText({ lines = 3, spacing = '0.7rem', className = '', height }) {
    return (
        <div className={`skeleton-text ${className}`} aria-hidden="true">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="skeleton"
                    style={{
                        width: i === lines - 1 ? '60%' : '100%',
                        height: `${ height || '1.75rem'}`,
                        borderRadius: '4px',
                        marginBottom: i < lines - 1 ? spacing : 0,
                        animationDelay: `${i * 0.15}s`,
                    }}
                />
            ))}
        </div>
    );
}

SkeletonText.propTypes = {
  lines: PropTypes.number,
  spacing: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};