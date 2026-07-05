import PropTypes from 'prop-types';

export default function Skeleton({ width, height, borderRadius = '8px', className = '', style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      aria-hidden="true"
      style={{
        width: width || '100%',
        height: height || '1rem',
        borderRadius,
        ...style,
      }}
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};