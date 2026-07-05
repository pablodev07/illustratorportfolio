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