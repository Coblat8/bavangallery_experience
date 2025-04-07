
import * as THREE from 'three'
import React from 'react'
import {   useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { editable as e } from '@theatre/r3f'

type GLTFResult = GLTF & {
  nodes: {
    wall_ground: THREE.Mesh
        logo: THREE.Mesh
        door001: THREE.Mesh
        bottom_inside: THREE.Mesh
  }
  materials: {}
}

export function BavanLogo(props: JSX.IntrinsicElements['group']) {

  const { nodes, materials } = useGLTF('/bavan_logo.glb') as GLTFResult

  return (
    <group {...props} dispose={null} scale={20}>
      <mesh name="wall_ground" geometry={nodes.wall_ground.geometry} position={[-2.987, 0, 0]} scale={[1.282, 1, 1]} castShadow receiveShadow frustumCulled={true} >
        <meshStandardMaterial 
          color={'black'}
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
      <mesh name="logo" geometry={nodes.logo.geometry} position={[0, -0.003, 0]} scale={1.971} castShadow receiveShadow frustumCulled={true}>
        <meshStandardMaterial 
          color={'black'}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      <mesh name="bottom_inside" geometry={nodes.bottom_inside.geometry} material={nodes.bottom_inside.material} position={[0, -0.003, 0]} scale={1.971} frustumCulled={true} >
        <meshStandardMaterial
          color={'white'}
          emissive={'white'}
          emissiveIntensity={1}
        />
      </mesh>
      <e.mesh theatreKey='door' name="door001" geometry={nodes.door001.geometry} position={[-0.103, 0.06, 0.158]} scale={1.971} castShadow receiveShadow frustumCulled={true} >
        <meshStandardMaterial 
          color={'black'}
          roughness={0.2}
          metalness={0.5}
        />
      </e.mesh>
    </group>
  )
}

useGLTF.preload('/bavan_logo.glb')

