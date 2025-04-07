'use client'

import { BavanGallery } from '@/components/canvas/BavanGallery'
import { PerspectiveCamera, editable as e } from '@theatre/r3f'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Yard } from './Yard'
import * as THREE from 'three'
import { useCurrentSheet } from '@theatre/r3f'
import { AccumulativeShadows, BakeShadows, Environment, Sky, SoftShadows } from '@react-three/drei'
import { useIsClient } from '@uidotdev/usehooks'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import IntroScene from './IntroScene'

export default function Experience() {

  const isMobile = window.innerWidth < 768

    const lookAtTarget = new THREE.Vector3(3.58, 5.37, 4.72)

  const cameraLookAtRef = useRef(null)
    const cameraRef = useRef(null)

const setInputGroupVisible = useAnimationStore((state) => state.setInputGroupVisible)
  // Only use refs, no state at all
  const showFirstObjectRef = useRef(true)
  const galleryGroupRef = useRef(null)

  const transitionRef = useRef(null)
  const materialRef = useRef()
  const sheet = useCurrentSheet()
  const obj = sheet.object('transitionEffect', { opacity: 0 })

  // Cache last opacity value to detect changes
  const lastOpacityRef = useRef(0)

  // Handle all updates in useFrame
  useFrame(() => {

   // Ensure camera lookAt is maintained
    if (cameraRef.current && cameraLookAtRef.current) {
      cameraRef.current.lookAt(cameraLookAtRef.current.position)
    }

    // Get current opacity value from Theatre.js
    const currentOpacity = obj.value.opacity

    // Only update if opacity has changed (performance optimization)
    if (lastOpacityRef.current !== currentOpacity) {
      lastOpacityRef.current = currentOpacity

      // Update transition material
      if (materialRef.current) {
        materialRef.current.opacity = currentOpacity
      }

      //   // Handle one-way transition to gallery using visibility instead of state
      if (currentOpacity >= 0.9 && showFirstObjectRef.current) {
        showFirstObjectRef.current = false

        // Toggle visibility of groups directly
        setInputGroupVisible(false)
        if (galleryGroupRef.current) galleryGroupRef.current.visible = true
      }
    }
  })
  const isClient = useIsClient()
  if(!isClient) return null


  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        theatreKey="Camera"
        makeDefault
        fov={isMobile ? 80 : 60}
        position={[1, 2.5, 5]}
      />

      <e.mesh
        ref={cameraLookAtRef}
        theatreKey="lookAt"
        visible="editor"
        position={lookAtTarget}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="hotpink" />
      </e.mesh>
      {/* <color
        args={[0x65c2f5]}
        attach="background"
      /> */}
      {/* <Environment
        files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr"
        environmentIntensity={0.1}
        background
      /> */}
      {/* <directionalLight 
        color={new THREE.Color(0xffffff)}
        intensity={1}
        position={[0, 2, 0]} 
        /> */}
      <Environment
        preset='sunset'
        blur={2}
        environmentIntensity={0.2}
        background
        // environmentRotation-y={-Math.PI / 2}
      />
      {/* <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      /> */}
      <SoftShadows />

      {/* Directional light with ref */}

      {/* Transition layer */}
      <e.mesh
        ref={transitionRef}
        theatreKey="transition"
        position={[0, 0, 0]}
        renderOrder={1000}
      >
        <planeGeometry args={[10000, 10000]} />
        <meshBasicMaterial
          ref={materialRef}
          color="white"
          transparent={true}
          opacity={0}
          side={THREE.DoubleSide}
          depthTest={false}
        />
      </e.mesh>

      <IntroScene />

      <group
        ref={galleryGroupRef}
        visible={false}
      >
        <BavanGallery />
        <Yard />
      </group>
    </>
  )
}
