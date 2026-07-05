import PropTypes from 'prop-types';

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

Image.propTypes = {
  src: PropTypes.string.isRequired,
  altLocalized: PropTypes.string,
  captionLocalized: PropTypes.string,
  titleLocalized: PropTypes.string,
  className: PropTypes.string,
  fetchPriority: PropTypes.string,
  loading: PropTypes.string,
};