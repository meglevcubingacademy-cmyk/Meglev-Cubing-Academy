// Renders high-definition puzzle visuals for the non-standard twisty puzzles
// using the exact official academy illustrations with subtle shape-appropriate animations.

const PUZZLE_IMAGES = {
  pyraminx: '/puzzles/pyraminx.png',
  megaminx: '/puzzles/megaminx.png',
  mirror: '/puzzles/mirror.png',
  axis: '/puzzles/axis.png',
  square1: '/puzzles/square1.png',
  skewb: '/puzzles/skewb.png',
}

const PUZZLE_LABELS = {
  pyraminx: 'Pyraminx Speedcube',
  megaminx: 'Megaminx Speedcube',
  mirror: 'Mirror Cube',
  axis: 'Axis Cube',
  square1: 'Square-1 Speedcube',
  skewb: 'Skewb Speedcube',
}

export default function PuzzleIcon({ kind }) {
  const src = PUZZLE_IMAGES[kind]
  const alt = PUZZLE_LABELS[kind] || 'Twisty Puzzle'

  if (!src) return null

  return (
    <div
      className={`puzzle-anim-${kind} flex items-center justify-center`}
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        className="h-28 w-28 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-transform duration-300"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}
