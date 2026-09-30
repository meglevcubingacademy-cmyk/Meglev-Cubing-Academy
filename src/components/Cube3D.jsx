// Realistic 3D Cube with Rubik's standard colors and physics-inspired rendering
const REAL_COLORS = {
  white: '#ffffff',
  yellow: '#ffd500',
  red: '#dc2626',
  orange: '#ff6b00',
  blue: '#2563eb',
  green: '#16a34a',
}

const COLOR_LIST = [
  REAL_COLORS.white,
  REAL_COLORS.yellow,
  REAL_COLORS.red,
  REAL_COLORS.orange,
  REAL_COLORS.blue,
  REAL_COLORS.green,
]

// Standard face transforms
const FACES = [
  ['rotateY(0deg)', 0],    // Front
  ['rotateY(180deg)', 1],  // Back
  ['rotateY(90deg)', 2],   // Right
  ['rotateY(-90deg)', 3],  // Left
  ['rotateX(90deg)', 4],   // Top
  ['rotateX(-90deg)', 5],  // Bottom
]

// Predefined realistic scramble distributions
const SCRAMBLE_SEEDS = [
  [0, 2, 4, 1, 0, 5, 3, 2, 1], // Face 0 (center is index 4 -> 0: white)
  [1, 3, 5, 0, 1, 4, 2, 3, 0], // Face 1
  [2, 4, 0, 3, 2, 1, 5, 4, 3], // Face 2
  [3, 5, 1, 2, 3, 0, 4, 5, 2], // Face 3
  [4, 0, 2, 5, 4, 3, 1, 0, 5], // Face 4
  [5, 1, 3, 4, 5, 2, 0, 1, 4], // Face 5
]

export default function Cube3D({ n = 3, size = 180, scrambled = false, small = false, shadow = true }) {
  const gap = Math.max(1.5, Math.round(size / 45))
  const half = size / 2
  const borderRadius = Math.max(2, Math.round(size / 38))

  const getStickerColor = (faceIndex, stickerIndex) => {
    if (!scrambled) {
      return COLOR_LIST[faceIndex % 6]
    }

    if (n === 3) {
      return COLOR_LIST[SCRAMBLE_SEEDS[faceIndex % 6][stickerIndex % 9]]
    }

    // Deterministic pseudo-scramble for 2x2, 4x4, 5x5, 6x6, 7x7
    const hash = (faceIndex * 19 + stickerIndex * 7 + (stickerIndex % 3) * 11 + Math.floor(stickerIndex / n) * 13) % 6
    return COLOR_LIST[hash]
  }

  return (
    <div
      className="scene"
      style={{
        width: size,
        height: size,
        filter: shadow ? 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))' : 'none',
      }}
      aria-hidden="true"
    >
      <div
        className={`cube ${small ? 'cube-sm' : ''}`}
        style={{ width: size, height: size }}
      >
        {FACES.map(([rot, f]) => (
          <div
            key={f}
            className="face"
            style={{
              width: size,
              height: size,
              transform: `${rot} translateZ(${half}px)`,
              gridTemplateColumns: `repeat(${n}, 1fr)`,
              gap: `${gap}px`,
              padding: `${gap}px`,
              backgroundColor: '#0c0f17',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {Array.from({ length: n * n }, (_, i) => {
              const bg = getStickerColor(f, i)
              return (
                <span
                  key={i}
                  style={{
                    backgroundColor: bg,
                    borderRadius: `${borderRadius}px`,
                    boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.4), inset 0 -1.5px 1.5px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
