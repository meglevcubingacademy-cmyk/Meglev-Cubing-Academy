import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

// Official Standard Speedcube Color Orientation (with bright, vibrant yellow)
export const STICKER_COLORS = {
  'y:1': 0xffffff,  // White (Top)
  'y:-1': 0xffdd00, // Bright Premium Yellow (Bottom)
  'z:1': 0x009e60,  // Green (Front)
  'z:-1': 0x0051ba, // Blue (Back)
  'x:1': 0xc41e3a,  // Red (Right)
  'x:-1': 0xff5800, // Orange (Left)
}

export function createCubelets(scene, options = {}) {
  const {
    spacing = 1.025,
    pieceSize = 0.98,
    stickerSize = 0.85,
    stickerThickness = 0.018,
    cornerBevel = 0.045,
    stickerBevel = 0.07,
    bodyRoughness = 0.42,
    bodyMetalness = 0.02,
    stickerRoughness = 0.22,
    stickerMetalness = 0.0,
  } = options

  // Speedcube core cubie body geometry with clean smooth beveled edges
  const bodyGeometry = new RoundedBoxGeometry(
    pieceSize,
    pieceSize,
    pieceSize,
    4,
    cornerBevel,
  )

  // Premium matte dark speedcube plastic core
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0d14,
    roughness: bodyRoughness,
    metalness: bodyMetalness,
  })

  // Speedcube sticker plate geometry with rounded corners & realistic raised depth
  const stickerGeometry = new RoundedBoxGeometry(
    stickerSize,
    stickerSize,
    stickerThickness,
    4,
    stickerBevel,
  )

  // Cache materials for performance & clean rendering
  const stickerMaterials = new Map()
  let logoGeometry
  let logoMaterial
  let logoTexture
  const materialFor = (colorHex) => {
    if (!stickerMaterials.has(colorHex)) {
      stickerMaterials.set(
        colorHex,
        new THREE.MeshStandardMaterial({
          color: colorHex,
          roughness: stickerRoughness,
          metalness: stickerMetalness,
        }),
      )
    }
    return stickerMaterials.get(colorHex)
  }

  const pieces = []
  const stickersConfig = [
    { axis: 'x', side: 1, direction: new THREE.Vector3(1, 0, 0) },
    { axis: 'x', side: -1, direction: new THREE.Vector3(-1, 0, 0) },
    { axis: 'y', side: 1, direction: new THREE.Vector3(0, 1, 0) },
    { axis: 'y', side: -1, direction: new THREE.Vector3(0, -1, 0) },
    { axis: 'z', side: 1, direction: new THREE.Vector3(0, 0, 1) },
    { axis: 'z', side: -1, direction: new THREE.Vector3(0, 0, -1) },
  ]

  // Build 27 individual speedcube cubies
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        const cubie = new THREE.Group()
        cubie.position.set(x * spacing, y * spacing, z * spacing)

        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.castShadow = true
        body.receiveShadow = true
        cubie.add(body)

        // Attach stickers to external faces
        for (const sticker of stickersConfig) {
          const isExterior =
            (sticker.axis === 'x' && x === sticker.side) ||
            (sticker.axis === 'y' && y === sticker.side) ||
            (sticker.axis === 'z' && z === sticker.side)

          if (!isExterior) continue

          const color = STICKER_COLORS[`${sticker.axis}:${sticker.side}`]
          const stickerMesh = new THREE.Mesh(stickerGeometry, materialFor(color))
          stickerMesh.castShadow = true
          stickerMesh.receiveShadow = true

          // Position flush on the face with realistic physical offset
          const offset = pieceSize / 2 + stickerThickness / 2 + 0.001
          stickerMesh.position.copy(sticker.direction).multiplyScalar(offset)
          stickerMesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            sticker.direction,
          )

          if (x === 0 && y === 1 && z === 0 && sticker.axis === 'y') {
            const canvas = document.createElement('canvas')
            canvas.width = 512
            canvas.height = 256
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.fillStyle = '#101a32'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.font = '800 190px Arial, sans-serif'
            context.fillText('MC', canvas.width / 2, canvas.height / 2 + 4)

            logoTexture = new THREE.CanvasTexture(canvas)
            logoTexture.colorSpace = THREE.SRGBColorSpace
            logoMaterial = new THREE.MeshBasicMaterial({
              map: logoTexture,
              transparent: true,
              depthWrite: false,
              side: THREE.DoubleSide,
              toneMapped: false,
            })
            logoGeometry = new THREE.PlaneGeometry(0.72, 0.36)

            const logo = new THREE.Mesh(logoGeometry, logoMaterial)
            logo.position.z = stickerThickness / 2 + 0.002
            logo.renderOrder = 1
            stickerMesh.add(logo)
          }

          cubie.add(stickerMesh)
        }

        scene.add(cubie)
        pieces.push(cubie)
      }
    }
  }

  return {
    pieces,
    dispose() {
      bodyGeometry.dispose()
      stickerGeometry.dispose()
      bodyMaterial.dispose()
      logoGeometry?.dispose()
      logoMaterial?.dispose()
      logoTexture?.dispose()
      for (const material of stickerMaterials.values()) {
        material.dispose()
      }
    },
  }
}
