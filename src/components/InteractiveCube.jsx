import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createCubelets } from './cubeGeometry.js'

function createContactShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.65)')
  gradient.addColorStop(0.28, 'rgba(0, 0, 0, 0.38)')
  gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.1)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 512)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function InteractiveCube() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return undefined

    // 1. WebGL Renderer
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch (error) {
      console.error('Unable to initialize WebGL for Rubik’s Cube:', error)
      return undefined
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.5 : 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 2. Scene & Fixed Perspective Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 0, 8.8)
    camera.lookAt(0, 0, 0)

    // 3. Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x141824, 1.4)
    scene.add(hemiLight)

    // Key Light (Upper-Front-Left)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6)
    keyLight.position.set(-5, 7.5, 6)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)

    // Fill Light (Lower-Right)
    const fillLight = new THREE.DirectionalLight(0xdbe8ff, 0.8)
    fillLight.position.set(5.5, -2, -3.5)
    scene.add(fillLight)

    // Warm Studio Rim / Backlight
    const rimLight = new THREE.DirectionalLight(0xffedd5, 1.6)
    rimLight.position.set(1.5, 5, -6)
    scene.add(rimLight)

    // 4. Contact Shadow on ground plane
    const shadowTexture = createContactShadowTexture()
    const shadowGeo = new THREE.PlaneGeometry(4.8, 4.8)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -2.05
    scene.add(shadowMesh)

    // 5. Construct 3x3x3 Speedcube Model (freely floating in space)
    const cubeGroup = new THREE.Group()
    cubeGroup.scale.setScalar(0.86)
    scene.add(cubeGroup)
    const { dispose: disposeCubelets } = createCubelets(cubeGroup)

    // Initial 3/4 professional orientation:
    // White (+Y) Top, Green (+Z) Front, Red (+X) Right
    cubeGroup.rotation.order = 'YXZ'
    cubeGroup.rotation.x = 0.72
    cubeGroup.rotation.y = -0.58
    cubeGroup.rotation.z = 0

    // 6. Holographic force-field physics. Rotation accumulates and never springs
    // back to the starting pose; only angular velocity is damped.
    const angularVelocity = new THREE.Vector3()
    const rotationAxis = new THREE.Vector3()
    const rotationStep = new THREE.Quaternion()
    let positionVelX = 0
    let positionVelY = 0
    let pointerVelocityX = 0
    let pointerVelocityY = 0
    let targetPositionX = 0
    let targetPositionY = 0
    let proximityTarget = 0
    let currentProximity = 0
    let previousPointerX = null
    let previousPointerY = null
    let previousPointerTime = 0
    let activeTouchPointerId = null
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const POINTER_SPEED_REFERENCE = 2200
    const POINTER_SPEED_CURVE = 1.55
    const MAX_POINTER_SPEED = 6000
    const ROTATION_X_SIGN = 1
    const ROTATION_Y_SIGN = 1

    const handlePointerMove = (clientX, clientY) => {
      const rect = container.getBoundingClientRect()
      const cubeCenterX = rect.left + rect.width / 2
      const cubeCenterY = rect.top + rect.height / 2

      const distX = clientX - cubeCenterX
      const distY = clientY - cubeCenterY
      const distance = Math.hypot(distX, distY)

      const influenceRadius = Math.max(rect.width * 0.82, 270)
      const rawProximity = THREE.MathUtils.clamp(1 - distance / influenceRadius, 0, 1)
      proximityTarget = rawProximity * rawProximity * (3 - 2 * rawProximity)

      targetPositionX =
        THREE.MathUtils.clamp(distX / (rect.width / 2), -1, 1) * proximityTarget * 0.07
      targetPositionY =
        -THREE.MathUtils.clamp(distY / (rect.height / 2), -1, 1) * proximityTarget * 0.07

      const now = performance.now()
      if (previousPointerX !== null && previousPointerY !== null && proximityTarget > 0) {
        const elapsed = Math.max((now - previousPointerTime) / 1000, 1 / 240)
        const dx = clientX - previousPointerX
        const dy = clientY - previousPointerY
        const velocityX = dx / elapsed
        const velocityY = dy / elapsed
        const pointerSpeed = Math.min(Math.hypot(velocityX, velocityY), MAX_POINTER_SPEED)
        const speedFactor = THREE.MathUtils.clamp(pointerSpeed / POINTER_SPEED_REFERENCE, 0, 1)
        const speedResponse = Math.pow(speedFactor, POINTER_SPEED_CURVE)

        if (pointerSpeed > 0) {
          pointerVelocityX = (velocityX / pointerSpeed) * speedResponse
          pointerVelocityY = (velocityY / pointerSpeed) * speedResponse
        } else {
          pointerVelocityX = 0
          pointerVelocityY = 0
        }
      } else {
        pointerVelocityX = 0
        pointerVelocityY = 0
      }

      previousPointerX = clientX
      previousPointerY = clientY
      previousPointerTime = now
    }

    const onPointerDown = (e) => {
      if (e.pointerType !== 'touch' || !e.isPrimary) return
      activeTouchPointerId = e.pointerId
      previousPointerX = e.clientX
      previousPointerY = e.clientY
      previousPointerTime = performance.now()
      pointerVelocityX = 0
      pointerVelocityY = 0
      handlePointerMove(e.clientX, e.clientY)
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch' && e.pointerId !== activeTouchPointerId) return
      handlePointerMove(e.clientX, e.clientY)
    }

    const clearPointerInfluence = () => {
      proximityTarget = 0
      targetPositionX = 0
      targetPositionY = 0
      pointerVelocityX = 0
      pointerVelocityY = 0
      previousPointerX = null
      previousPointerY = null
    }

    const onPointerEnd = (e) => {
      if (e.pointerType !== 'touch' || e.pointerId !== activeTouchPointerId) return
      activeTouchPointerId = null
      clearPointerInfluence()
    }

    const onPointerLeave = (e) => {
      if (e.pointerType !== 'touch') clearPointerInfluence()
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', clearPointerInfluence)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)

    // 7. Responsive Resizing
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const width = rect.width || 380
      const height = rect.height || 380
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.fov = width < 480 ? 36 : 32
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    // 8. 360-Degree Holographic Physics Loop
    let animId
    let isDisposed = false
    let clockTime = 0
    let lastFrameTime = performance.now()

    const animate = () => {
      if (isDisposed) return

      const now = performance.now()
      const deltaSec = Math.min((now - lastFrameTime) / 1000, 0.05)
      lastFrameTime = now
      clockTime += deltaSec

      // 1. Natural levitation and subtle attraction without attaching the cube to the cursor
      const reducedMotion = motionPreference.matches
      const motionScale = reducedMotion ? 0.24 : 1
      const floatOffsetY = Math.sin(clockTime * 1.3) * 0.055 * motionScale
      const proximityEase = 1 - Math.exp(-deltaSec * 10)
      currentProximity = THREE.MathUtils.lerp(currentProximity, proximityTarget, proximityEase)

      const positionSpring = 12
      const positionDamping = Math.exp(-deltaSec * 7)
      positionVelX += (targetPositionX * motionScale - cubeGroup.position.x) * positionSpring * deltaSec
      positionVelY +=
        (targetPositionY * motionScale - (cubeGroup.position.y - floatOffsetY)) *
        positionSpring *
        deltaSec
      positionVelX *= positionDamping
      positionVelY *= positionDamping
      cubeGroup.position.x += positionVelX * deltaSec
      cubeGroup.position.y = floatOffsetY + (cubeGroup.position.y - floatOffsetY + positionVelY * deltaSec)

      // Contact shadow breathes with levitation height
      shadowMesh.scale.setScalar(1 - floatOffsetY * 0.6)
      shadowMat.opacity = 0.58 - floatOffsetY * 0.1

      // 2. Pointer velocity accelerates the cube; after release, damping alone
      // slows it so the last user-selected orientation remains persistent.
      const inputScale = reducedMotion ? 0.35 : 1
      const angularAcceleration = 65 * inputScale * currentProximity
      angularVelocity.x += pointerVelocityY * angularAcceleration * ROTATION_X_SIGN * deltaSec
      angularVelocity.y += pointerVelocityX * angularAcceleration * ROTATION_Y_SIGN * deltaSec
      angularVelocity.z += -pointerVelocityX * angularAcceleration * 0.035 * deltaSec

      const angularDamping = Math.exp(-deltaSec * (reducedMotion ? 4 : 0.72))
      angularVelocity.multiplyScalar(angularDamping)
      const maxAngularSpeed = reducedMotion ? 1.2 : 12
      angularVelocity.clampLength(0, maxAngularSpeed)

      const angularSpeed = angularVelocity.length()
      if (angularSpeed > 0.00001) {
        rotationAxis.copy(angularVelocity).normalize()
        rotationStep.setFromAxisAngle(rotationAxis, angularSpeed * deltaSec)
        cubeGroup.quaternion.premultiply(rotationStep).normalize()
      } else {
        angularVelocity.set(0, 0, 0)
      }

      pointerVelocityX *= Math.exp(-deltaSec * 4.5)
      pointerVelocityY *= Math.exp(-deltaSec * 4.5)

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    // 9. Cleanup
    return () => {
      isDisposed = true
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', clearPointerInfluence)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      disposeCubelets()
      shadowGeo.dispose()
      shadowMat.dispose()
      shadowTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[340px] w-full max-w-[400px] touch-none items-center justify-center sm:h-[380px] lg:h-[430px] cursor-default"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full pointer-events-none select-none drop-shadow-2xl cursor-default"
        role="img"
        aria-label="Floating 3D Speedcube with holographic force-field interaction."
      />
    </div>
  )
}
