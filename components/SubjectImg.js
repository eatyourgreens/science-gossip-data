export default function SubjectImg({ className, size = 'standard', subject }) {
  if (!subject) {
    return ''
  }
  const staticRoot = 'static.zooniverse.org';
  let src = subject.location[size];
  src = src.replace('zooniverse-static.s3.amazonaws.com', staticRoot);
  src = src.replace('http://', 'https://');
  const passThrough = (size === 'standard');
  let thumbnailPath = src.replace(`https://`, '');
  thumbnailPath = thumbnailPath.replace(staticRoot, '');
  src =  passThrough ? src : `https://thumbnails.zooniverse.org/150x150/${thumbnailPath}`;
  const classAttr = className ? `class="${className}"` : '';
  return `
    <img
      loading=lazy
      ${classAttr}
      alt="Subject ${subject.zooniverse_id}"
      src="${src}"
    />
  `
}