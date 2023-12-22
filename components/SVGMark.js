const colours = {
  drawing: 'indigo',
  map: 'blue',
  chart: 'red',
  table: 'lightseagreen',
  inscription: 'maroon',
  species: 'green',
  contributor: 'steelblue'
}

export default function SVGMark({ mark }) {
  const [ cx, cy, x, y, width, height ] = mark.coords
  const colour = colours[mark.type] || 'yellow'
  
  if (cx || cy) {
    return `
      <circle
        stroke=${colour}
        fill="transparent"
        cx=${cx}
        cy=${cy}
        r=30
      />
    `
  }
  return `
    <rect
      stroke=${colour}
      stroke-dasharray='2 4'
      fill="transparent"
      x=${x}
      y=${y}
      width=${width}
      height=${height}
    />
  `
}