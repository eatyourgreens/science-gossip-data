export default function SVGSubject(content, { subject }) {
  const { original_size } = subject.metadata;
  const maxDimension = Math.max(original_size.height, original_size.width);
  const scale = 1400 / maxDimension;
  const height = original_size.height * scale;
  const width = original_size.width * scale;
  let href = subject.location.standard.replace('zooniverse-static.s3.amazonaws.com', 'static.zooniverse.org');
  href = href.replace('http://', 'https://');
  return `
  <svg
    preserveAspectRatio="xMidYMid meet"
    viewbox="0 0 ${width} ${height}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      height=${height}
      width=${width}
      xlink:href=${href}
    />
    ${content}
  </svg>
  `
}