import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createCubelets } from './cubeGeometry.js'

const scrambleMoves = [
  'R',
  'U2',
  "F'",
  'L',
  'D',
  'B2',
  "R'",
  'U',
  'F2',
  "D'",
  "L'",
  'U2',
  'B',
  'R2',
  'F',
  'D2',
]

const faces = {
  R: { axis: 'x', layer: 1, sign: 1, color: 0xdc2626 },
  L: { axis: 'x', layer: -1, sign: -1, color: 0xff6b00 },
  U: { axis: 'y', layer: 1, sign: 1, color: 0xffffff },
  D: { axis: 'y', layer: -1, sign: -1, color: 0xffd500 },
  F: { axis: 'z', layer: 1, sign: 1, color: 0x16a34a },
  B: { axis: 'z', layer: -1, sign: -1, color: 0x2563eb },
}

const axisVectors = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
}

function moveAngle(move) {
  const face = faces[move[0]]
  const direction = move.endsWith("'") ? -1 : 1
  const turns = move.endsWith('2') ? 2 : 1
  return -face.sign * direction * turns * Math.PI / 2
}

function inverseMove(move) {
  if (move.endsWith('2')) return move
  return move.endsWith("'") ? move[0] : `${move}'`
}

function turnState(state, move, angle) {
  const face = faces[move[0]]
  const rotation = new THREE.Quaternion().setFromAxisAngle(axisVectors[face.axis], angle)

  return state.map(({ position, orientation }) => {
    if (Math.round(position[face.axis]) !== face.layer) {
      return { position: position.clone(), orientation: orientation.clone() }
    }

    return {
      position: position.clone().applyQuaternion(rotation).round(),
      orientation: rotation.clone().multiply(orientation).normalize(),
    }
  })
}

function createMoveTimeline() {
  const start = []
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        start.push({
          position: new THREE.Vector3(x, y, z),
          orientation: new THREE.Quaternion(),
        })
      }
    }
  }

  let scrambled = start
  for (const move of scrambleMoves) {
    scrambled = turnState(scrambled, move, moveAngle(move))
  }

  const solveMoves = [...scrambleMoves].reverse().map(inverseMove)
  const states = [scrambled]
  let state = scrambled
  for (const move of solveMoves) {
    state = turnState(state, move, moveAngle(move))
    states.push(state)
  }

  const solved = state.every(({ position, orientation }, index) => {
    const original = start[index]
    return (
      position.distanceToSquared(original.position) < 1e-8 &&
      Math.abs(orientation.dot(original.orientation)) > 1 - 1e-8
    )
  })

  if (!solved) {
    throw new Error('The scroll cube solve sequence does not return to its solved state.')
  }

  return { scrambled, solveMoves, states }
}

const timeline = createMoveTimeline()

function easeTurn(progress) {
  return progress * progress * (3 - 2 * progress)
}

export default function ScrollSolvingCube() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const container = containerRef.current

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.innerWidth > 700,
        powerPreference: 'low-power',
      })
    } catch (error) {
      console.error('Unable to initialize the scroll-driven 3D cube.', error)
      return undefined
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    const cameraDirection = new THREE.Vector3(4.4, 3.4, 7.4).normalize()
    camera.position.copy(cameraDirection).multiplyScalar(9.8)
    camera.lookAt(0, 0, 0)

    const cube = new THREE.Group()
    scene.add(cube)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x222938, 1.15))

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(-4, 7, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.45)
    fillLight.position.set(5, -3, -4)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0xffd98a, 2.5, 18)
    rimLight.position.set(2, 4, 5)
    scene.add(rimLight)

    const { pieces, dispose } = createCubelets(cube)
    let frame = 0
    let disposed = false
    let idleTimer
    let baseScale = 0.62
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')

    const getScrollProgress = () => {
      if (motionPreference.matches) return 1
      const footerEl = document.querySelector('footer')
      const maxScroll = footerEl
        ? Math.max(1, footerEl.offsetTop - window.innerHeight)
        : document.documentElement.scrollHeight - window.innerHeight
      return maxScroll > 0
        ? THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
        : 0
    }

    const renderProgress = (progress) => {
      if (disposed) return

      const movePosition = progress * timeline.solveMoves.length
      const completedMoves = Math.min(
        Math.floor(movePosition),
        timeline.solveMoves.length - 1,
      )
      const turnProgress =
        progress >= 1 ? 0 : easeTurn(movePosition - completedMoves)
      const baseState = timeline.states[progress >= 1
        ? timeline.solveMoves.length
        : completedMoves]
      const activeMove = progress >= 1 ? null : timeline.solveMoves[completedMoves]
      const face = activeMove ? faces[activeMove[0]] : null
      const angle = activeMove ? moveAngle(activeMove) * turnProgress : 0
      const rotation = activeMove
        ? new THREE.Quaternion().setFromAxisAngle(
            axisVectors[face.axis],
            angle,
          )
        : null

      for (let index = 0; index < pieces.length; index += 1) {
        const piece = pieces[index]
        const state = baseState[index]
        piece.position.copy(state.position).multiplyScalar(1.02)
        piece.quaternion.copy(state.orientation)

        if (activeMove && Math.round(state.position[face.axis]) === face.layer) {
          piece.position.applyAxisAngle(axisVectors[face.axis], angle)
          piece.quaternion.premultiply(rotation).normalize()
        }
      }

      const finalEmphasis = THREE.MathUtils.smoothstep(progress, 0.94, 1)
      cube.scale.setScalar(baseScale * (1 + finalEmphasis * 0.025))
      renderer.render(scene, camera)
    }

    const scheduleRender = (force = false) => {
      if (motionPreference.matches && !force) return
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        renderProgress(getScrollProgress())
      })
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const mobile = width <= 600
      const tablet = width <= 900
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.fov = mobile ? 42 : tablet ? 40 : 38
      camera.position.copy(cameraDirection).multiplyScalar(mobile ? 10.5 : 9.8)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld(true)

      const aspect = width / height
      const targetWidth = aspect < 0.9 ? 0.38 : 0.5
      const targetHeight = aspect < 0.9 ? 0.34 : 0.5
      cube.scale.setScalar(1)
      cube.position.set(0, 0, 0)
      cube.updateMatrixWorld(true)

      const bounds = new THREE.Box3().setFromObject(cube)
      let minX = Infinity
      let maxX = -Infinity
      let minY = Infinity
      let maxY = -Infinity

      for (const x of [bounds.min.x, bounds.max.x]) {
        for (const y of [bounds.min.y, bounds.max.y]) {
          for (const z of [bounds.min.z, bounds.max.z]) {
            const point = new THREE.Vector3(x, y, z).project(camera)
            minX = Math.min(minX, point.x)
            maxX = Math.max(maxX, point.x)
            minY = Math.min(minY, point.y)
            maxY = Math.max(maxY, point.y)
          }
        }
      }

      const widthFraction = (maxX - minX) / 2
      const heightFraction = (maxY - minY) / 2
      const fitScale = Math.min(
        targetWidth / widthFraction,
        targetHeight / heightFraction,
      ) * 0.94
      cube.scale.setScalar(fitScale)
      cube.updateMatrixWorld(true)

      const fittedBounds = new THREE.Box3().setFromObject(cube)
      minX = Infinity
      maxX = -Infinity
      minY = Infinity
      maxY = -Infinity

      for (const x of [fittedBounds.min.x, fittedBounds.max.x]) {
        for (const y of [fittedBounds.min.y, fittedBounds.max.y]) {
          for (const z of [fittedBounds.min.z, fittedBounds.max.z]) {
            const point = new THREE.Vector3(x, y, z).project(camera)
            minX = Math.min(minX, point.x)
            maxX = Math.max(maxX, point.x)
            minY = Math.min(minY, point.y)
            maxY = Math.max(maxY, point.y)
          }
        }
      }

      const cameraRight = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
      const cameraUp = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
      const viewHalfHeight =
        camera.position.length() * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
      cube.position
        .addScaledVector(cameraRight, -((minX + maxX) / 2) * viewHalfHeight * aspect)
        .addScaledVector(cameraUp, -((minY + maxY) / 2) * viewHalfHeight)

      baseScale = cube.scale.x
      scheduleRender(true)
    }

    const onScroll = () => {
      container?.classList.add('is-scrolling')
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        container?.classList.remove('is-scrolling')
      }, 180)
      scheduleRender()
    }
    const onMotionPreferenceChange = () => scheduleRender(true)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    motionPreference.addEventListener('change', onMotionPreferenceChange)
    resize()
    renderProgress(getScrollProgress())

    return () => {
      disposed = true
      if (frame) window.cancelAnimationFrame(frame)
      window.clearTimeout(idleTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
      dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-solving-cube" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
