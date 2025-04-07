'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ScrollTicker } from '@/templates/Scroll'
import {  Preload, Stats, useTexture, useGLTF, useDetectGPU } from '@react-three/drei'
import { getProject } from '@theatre/core'
import { RafDriverProvider, RefreshSnapshot, SheetProvider } from '@theatre/r3f'
// import extension from '@theatre/r3f/dist/extension'
// import studio from '@theatre/studio'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import projectState from '../../../public/Bavan Gallery Project.theatre-project-state-3.json'
import Experience from './Experience'
import LoadingScreen from './LoadingScreen'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { BavanGallery } from './BavanGallery'
import { Yard } from './Yard'
import { BavanLogo } from './BavanLogo'
import { useIsClient } from '@uidotdev/usehooks'
import { theatreRafDriver } from './CustomRafDriver'


const isProd = true

// if (!isProd) {
//   studio.initialize()
//   studio.extend(extension)
//   studio.ui.hide()
// }
export const project = getProject(
  'Bavan Gallery Project',
  isProd
    ? {
        state: projectState,
      }
    : undefined
)
export const bavanGallerySheet = project.sheet('Bavan Gallery Sheet')


// Improved PreloadAssets component - this is crucial
function PreloadAssets() {
  // Preload all regular textures
  useTexture([
    '/Smeared_wall/Smeared Wall_BaseColor3.jpg',
    '/Smeared_wall/Smeared Wall_Normal.jpg',
    '/black_metal/metal09_diffuse.jpg',
    '/black_metal/metal0_normal_opengl.jpg',
    '/black_metal/metal0_glossiness.jpg',
    '/concrete/albedo.jpg',
    '/concrete/normal.jpg',
    '/concrete/roughness.jpg',
    '/paintings/Image_1_back_2.jpg',
    '/paintings/Image_2_front.jpg',
    '/paintings/Image_3_front.jpg',
    '/paintings/Image_4_front.jpg',
    '/paintings/Image_5_front.jpg',
    '/ao/inside_wall_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/bottom_walls_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/ground_floor_1_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/ground_floor_2_Bake1_PBR_Ambient_Occlusion.jpg',
    '/ao/top_walls_Bake1_PBR_Ambient_Occlusion.jpg',
  ])

  // Preload EXR lightmaps - important for correct loading detection
  useLoader(EXRLoader, '/lightmaps/inside_wall_Bake1_PBR_Lightmap.exr')
  useLoader(EXRLoader, '/lightmaps/bottom_walls_Bake1_PBR_Lightmap.exr')
  useLoader(EXRLoader, '/lightmaps/ground_floor_1_Bake1_PBR_Lightmap.exr')
  useLoader(EXRLoader, '/lightmaps/ground_floor_2_Bake1_PBR_Lightmap.exr')
  useLoader(EXRLoader, '/lightmaps/top_walls_Bake1_PBR_Lightmap.exr')

  // Preload all models through the global useGLTF.preload
  useGLTF.preload('/bavan_gallery_final.glb')
  useGLTF.preload('/yard-transformed.glb')
  useGLTF.preload('/bavan_logo.glb')

  // Also instantiate the actual components to force-load their specific materials
  // but make them invisible
  return (
    <group visible={false} position={[0, -1000, 0]}>
      <BavanGallery />
      <Yard />
      <BavanLogo />
    </group>
  )
}

export default function Scene({ ...props }) {
  const audioRef = useRef(null)
  const setIntroCompleted = useAnimationStore((state) => state.setIntroCompleted)
  const [start, setStart] = useState(false)
  const isClient = useIsClient()

 const GPUTier = useDetectGPU()


  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('./audio/0406.mp3')
      
    }
  }, [start])

  useEffect(() => {
    if (start) {
      
      audioRef.current.play()
      audioRef.current.loop = true
      audioRef.current.volume = 0.5 * audioRef.current.volume
      // Delay the animation by 4 seconds
      const animationTimer = setTimeout(() => {
        project.ready.then(() => {
          bavanGallerySheet.sequence.position = 0
          bavanGallerySheet.sequence
            .play({
              range: [0, 4],
              rafDriver: theatreRafDriver,
            })
            .then(() => {
              // bavanGallerySheet.sequence.pause()
              setIntroCompleted(true)
            })
        })
      }, 1500) // 4 seconds delay

      // Cleanup function to clear the timeout if component unmounts
      return () => clearTimeout(animationTimer)
    }
  }, [setIntroCompleted, start])

  
  if(!isClient) return null

  return (
    <>
    <RafDriverProvider driver={theatreRafDriver}>
      <Canvas
        {...props}
        shadows
        gl={{
          antialias: false,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 2,
        }}
        onCreated={({ gl }) => {
          gl.clearDepth()
          gl.toneMapping = THREE.AgXToneMapping
        }}
        dpr={GPUTier.tier === 1 ? 1.5 : GPUTier.tier === 2 ? 2 : 2}
        style={{
          zIndex: 30,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'auto',
        }}
      >
        <Stats />

        <Suspense fallback={null}>
          <SheetProvider sheet={bavanGallerySheet}>
            <PreloadAssets />
            <ScrollTicker />
            <RefreshSnapshot />
            {/* <AdaptiveDpr pixelated /> */}
            {/* <Environment preset="city" /> */}
            
             {start && <Experience />}
            
            <Preload all />
          </SheetProvider>
        </Suspense>
      </Canvas>
      </RafDriverProvider>
      <LoadingScreen
        started={start}
        onStarted={() =>{ 

          setStart(true)
        }}
      />
    </>
  )
}
