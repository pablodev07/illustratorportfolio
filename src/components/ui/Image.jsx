export default function Image({
  src,
  altLocalized = '',
  captionLocalized = '',
  titleLocalized = '',
  className = '',
  fetchPriority = '',
  loading = 'lazy',
  ...props
}) {
  return (
    <img
      src={src}
      alt={altLocalized}
      title={titleLocalized}
      data-caption={captionLocalized}
      className={className}
      loading={loading}
      fetchpriority={fetchPriority}
      {...props}
    />
  );
}