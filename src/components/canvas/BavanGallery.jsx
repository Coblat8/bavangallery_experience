
import { CubeCamera, InstanceProps, Merged, useBoxProjectedEnv, useDetectGPU, useEnvironment, useGLTF, useTexture } from '@react-three/drei'
import { applyProps, ObjectMap, useLoader } from '@react-three/fiber'
import React, { FC, useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'


// type StuffMeshesProps = {
//   Image_1_front: FC<InstanceProps>,
//   Image_2_front: FC<InstanceProps>,
//   Image_3_front: FC<InstanceProps>,
//   Image_4_front: FC<InstanceProps>,
//   Image_5_front: FC<InstanceProps>,
//   Single_lamp: FC<InstanceProps>,
//   Lamps013: FC<InstanceProps>,
//   Lamps005: FC<InstanceProps>,
//   Bench1_2: FC<InstanceProps>,
//   Door_knock: FC<InstanceProps>,
//   Paint_Hanger: FC<InstanceProps>,
//   PictureFrame01_MDL_nar_blinn2_0001: FC<InstanceProps>,
//   Cube_lamp_1: FC<InstanceProps>,
//   Inside_wall: FC<InstanceProps>,
//   Bottom_walls: FC<InstanceProps>,
//   Top_walls: FC<InstanceProps>,
//   Door_floor_1: FC<InstanceProps>,
//   Yard_sign: FC<InstanceProps>,
//   Text_desc: FC<InstanceProps>,
//   Text_qr_code002: FC<InstanceProps>,
//   Exhibition_continues_1: FC<InstanceProps>,
//   Exhibition_continues_2: FC<InstanceProps>,
//   QR_code_1: FC<InstanceProps>,
//   QR_code_2: FC<InstanceProps>,
// }

// type GLTFResult = GLTF & ObjectMap & {
//   nodes: {
//     cube_lamp_1: THREE.Mesh
//     cube_lamp_2: THREE.Mesh
//     inside_wall: THREE.Mesh
//     ground_floor_1: THREE.Mesh
//     ground_floor_2: THREE.Mesh
//     top_walls: THREE.Mesh
//     bottom_walls: THREE.Mesh
//     pictureFrame01_MDL_nar_blinn2_0001: THREE.Mesh
//     Paint_Hanger: THREE.Mesh
//     Paint_Hanger001: THREE.Mesh
//     Image_1_front: THREE.Mesh
//     Image_2_front: THREE.Mesh
//     Image_3_front: THREE.Mesh
//     Image_5_front: THREE.Mesh
//     Image_4_front: THREE.Mesh
//     Lamps013: THREE.Mesh
//     Lamps005: THREE.Mesh
//     bench1_2: THREE.Mesh
//     door_knock: THREE.Mesh
//     door_floor_1: THREE.Mesh
//     door_floor_2: THREE.Mesh
//     single_lamp: THREE.Mesh
//     yard_sign: THREE.Mesh
//     exhibition_continues_1: THREE.Mesh
//     exhibition_continues_2: THREE.Mesh
//     text_desc: THREE.Mesh
//     text_qr_code002: THREE.Mesh
//   }
//   materials: {
//     yard_sign: THREE.MeshStandardMaterial
//         SBW_exhibition_continues: THREE.MeshStandardMaterial
//         text: THREE.MeshStandardMaterial
//         QR_code: THREE.MeshStandardMaterial
//         ['pictureFrame01_MDL_nar_blinn2_0.001_baked']: THREE.MeshStandardMaterial
//         Image_1_front_baked: THREE.MeshStandardMaterial
//         Image_2_front_baked: THREE.MeshStandardMaterial
//         Image_3_front_baked: THREE.MeshStandardMaterial
//         Image_5_front_Baked: THREE.MeshStandardMaterial
//         image_4_baked: THREE.MeshStandardMaterial
//   }
// }

export function BavanGallery(props) {
  const { scenes ,nodes, materials } = useGLTF('/bavan_gallery_final.glb')

   const GPUTier = useDetectGPU() 

  //DIFFUSE MAps
  const smearedWallMap = useTexture('/Smeared_wall/Smeared Wall_BaseColor3.jpg')
  const smearedWallNormal = useTexture('/Smeared_wall/Smeared Wall_Normal.jpg')
  const blackMetalMap = useTexture('/black_metal/metal09_diffuse.jpg')
  const blackMetalNormal = useTexture('/black_metal/metal0_normal_opengl.jpg')
  const blackMetalRoughness = useTexture('/black_metal/metal0_glossiness.jpg')
  const groundConcreteMap = useTexture('/concrete/albedo.jpg')
  const groundConcreteNormal = useTexture('/concrete/normal.jpg')
  const groundConcreteRoughness = useTexture('/concrete/roughness.jpg')
  const image_1_map = useTexture('/paintings/Image_1_back_2.jpg')
  const image_2_map = useTexture('/paintings/Image_2_front.jpg')
  const image_3_map = useTexture('/paintings/Image_3_front.jpg')
  const image_4_map = useTexture('/paintings/Image_4_front.jpg')
  const image_5_map = useTexture('/paintings/Image_5_front.jpg')


  //AO MAPS
  const insideWall_AO = useTexture('/ao/inside_wall_Bake1_PBR_Ambient_Occlusion.jpg')
  const bottomWalls_AO = useTexture('/ao/bottom_walls_Bake1_PBR_Ambient_Occlusion.jpg')
  const groundFloor_1_AO = useTexture('ao/ground_floor_1_Bake1_PBR_Ambient_Occlusion.jpg')
  const groundFloor_2_AO = useTexture('ao/ground_floor_2_Bake1_PBR_Ambient_Occlusion.jpg')
  const topWalls_AO = useTexture('ao/top_walls_Bake1_PBR_Ambient_Occlusion.jpg')

  insideWall_AO.flipY = false
  bottomWalls_AO.flipY = false
  topWalls_AO.flipY = false
  groundFloor_1_AO.flipY = false
  groundFloor_2_AO.flipY = false

  function useEXRTexture(url) {
    const texture = useLoader(EXRLoader, url, (loader) => {
      // loader.loadAsync(url).then((texture) => {
      //   texture.flipY = true
      //   texture.needsUpdate = true
      // }
      // )
      
    })
    texture.flipY = true
    texture.needsUpdate = true
    return texture
  }


  //LightMaps textures
  const insideWall_LM = useEXRTexture('/lightmaps/inside_wall_Bake1_PBR_Lightmap.exr')
  const bottomWalls_LM = useEXRTexture('/lightmaps/bottom_walls_Bake1_PBR_Lightmap.exr')
  const groundFloor_1_LM = useEXRTexture('/lightmaps/ground_floor_1_Bake1_PBR_Lightmap.exr')
  const groundFloor_2_LM = useEXRTexture('/lightmaps/ground_floor_2_Bake1_PBR_Lightmap.exr')
  const topWalls_LM = useEXRTexture('/lightmaps/top_walls_Bake1_PBR_Lightmap.exr')


  // Scaling Maps
  smearedWallMap.wrapS = smearedWallMap.wrapT = THREE.RepeatWrapping
  smearedWallMap.repeat.set(4, 4)
  smearedWallNormal.wrapS = smearedWallNormal.wrapT = THREE.RepeatWrapping
  smearedWallNormal.repeat.set(4, 4)
  groundConcreteMap.wrapS = groundConcreteMap.wrapT = THREE.RepeatWrapping
  groundConcreteMap.repeat.set(6, 6)
  groundConcreteNormal.wrapS = groundConcreteNormal.wrapT = THREE.RepeatWrapping
  groundConcreteNormal.repeat.set(6, 6)
  groundConcreteRoughness.wrapS = groundConcreteRoughness.wrapT = THREE.RepeatWrapping
  groundConcreteRoughness.repeat.set(6, 6)

  image_1_map.wrapS = image_1_map.wrapT = THREE.RepeatWrapping
  image_1_map.repeat.set(3.2, 3.1)
  image_1_map.offset.set(-0.05, -0.07)
  image_2_map.wrapS = image_2_map.wrapT = THREE.RepeatWrapping
  image_2_map.repeat.set(2.4, 2)
  image_2_map.offset.set(-0.28, -1.2)

  image_4_map.wrapS = image_4_map.wrapT = THREE.RepeatWrapping
  image_4_map.repeat.set(3, 3)
  image_4_map.offset.set(-0.72, -1.1)

  image_5_map.wrapS = image_5_map.wrapT = THREE.RepeatWrapping
  image_5_map.repeat.set(3.01, 3.01)
  image_5_map.offset.set(-1.05, -1.01)
  image_5_map.rotation = Math.PI / 2

  image_3_map.wrapS = image_3_map.wrapT = THREE.RepeatWrapping
  image_3_map.repeat.set(2.6, 2.4)
  image_3_map.offset.set(-0.55, -0.875)

  const bottomWalls = nodes.bottom_walls
  const insideWalls = nodes.inside_wall
  const image1 = nodes.Image_1_front
  const image2 = nodes.Image_2_front
  const image3 = nodes.Image_3_front
  const image4 = nodes.Image_4_front
  const image5 = nodes.Image_5_front
  const paintFrame = nodes.pictureFrame01_MDL_nar_blinn2_0001
  const Lamps013 = nodes.Lamps013
  const Lamps005 = nodes.Lamps005
  const bench1_2 = nodes.bench1_2

  useLayoutEffect(() => {
    bottomWalls.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    insideWalls.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    image1.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    image2.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    image3.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    image4.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    image5.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
    paintFrame.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.2 })
      }
    })
    Lamps013.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.2 })
      }
    })
    Lamps005.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.2 })
      }
    })
    bench1_2.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.3 })
      }
    })

    const floor = nodes.ground_floor_1
    if (floor) floor.remove(floor)
  }, [
    bottomWalls,
    bench1_2,
    Lamps005,
    Lamps013,
    paintFrame,
    image5,
    image4,
    image3,
    image2,
    image1,
    insideWalls,
  ])


  const groundEnv = useEnvironment({ files: '/studio_small_03_1k.hdr' })
  const projection = useBoxProjectedEnv([0, 2, 0], [17, 5.5, 12])


  const noMaterial = new THREE.MeshStandardMaterial({
    color: 'gray',
    envMap: groundEnv,
    envMapIntensity: 0.5,
  })

  const blackMaterial = new THREE.MeshStandardMaterial({
    map: blackMetalMap,
    normalMap: blackMetalNormal,
    roughnessMap: blackMetalRoughness,
    envMap: GPUTier.tier > 2 ?  groundEnv : undefined,
    roughness: 0.1,
    metalness: 0.9,
    envMapIntensity: GPUTier.tier > 2 ? 0.1 : 0 ,
  })

  nodes.single_lamp.material = blackMaterial
  nodes.Lamps013.material = blackMaterial
  nodes.Lamps005.material = blackMaterial
  nodes.bench1_2.material = blackMaterial
  nodes.door_knock.material = blackMaterial
  nodes.Paint_Hanger.material = blackMaterial
  nodes.cube_lamp_1.material = noMaterial
  nodes.door_floor_1.material = blackMaterial
  nodes.door_floor_2.material = blackMaterial
  // nodes.Image_1_front.material = new THREE.MeshStandardMaterial({
  //   // map: image_1_map,
  //   emissiveMap: image_1_map,
  //   emissive: '#888888',
  //   emissiveIntensity: 3,
  //   toneMapped: false,
  // })

  materials.Image_1_front_baked.emissiveIntensity = 0.8
  materials.Image_1_front_baked.toneMapped = false
  materials.Image_1_front_baked.emissiveMap = image_1_map
  nodes.Image_1_front.material = materials.Image_1_front_baked

  materials.Image_2_front_baked.emissiveIntensity = 1
  materials.Image_2_front_baked.toneMapped = false
  materials.Image_2_front_baked.emissiveMap = image_2_map
  nodes.Image_2_front.material = materials.Image_2_front_baked

  materials.Image_3_front_baked.emissiveIntensity = 0.8
  materials.Image_3_front_baked.toneMapped = false
  materials.Image_3_front_baked.emissiveMap = image_3_map
  nodes.Image_3_front.material = materials.Image_3_front_baked

  materials.Image_5_front_Baked.emissiveIntensity = 1
  materials.Image_5_front_Baked.toneMapped = false
  materials.Image_5_front_Baked.emissiveMap = image_5_map
  materials.Image_5_front_Baked.emissiveMap.flipY = true
  nodes.Image_5_front.material = materials.Image_5_front_Baked

  materials.image_4_baked.emissiveIntensity = 0.7
  materials.image_4_baked.toneMapped = false
  materials.image_4_baked.emissiveMap = image_4_map
  nodes.Image_4_front.material = materials.image_4_baked

  materials.text.emissiveIntensity = 100
  materials.text.envMapIntensity = 0
  materials.text.lightMapIntensity = 10
  materials.text.color = 'black'
  materials.text.needsUpdate = true
  nodes.text_desc.material = materials.text

  const stuffMeshes = {
    Image_1_front: nodes.Image_1_front,
    Image_2_front: nodes.Image_2_front,
    Image_3_front: nodes.Image_3_front,
    Image_4_front: nodes.Image_4_front,
    Image_5_front: nodes.Image_5_front,
    Single_lamp: nodes.single_lamp,
    Lamps013: nodes.Lamps013,
    Lamps005: nodes.Lamps005,
    Bench1_2: nodes.bench1_2,
    Door_knock: nodes.door_knock,
    Paint_Hanger: nodes.Paint_Hanger,
    PictureFrame01_MDL_nar_blinn2_0001: nodes.pictureFrame01_MDL_nar_blinn2_0001,
    Cube_lamp_1: nodes.cube_lamp_1,
    Door_floor_1: nodes.door_floor_1,
    Door_floor_2: nodes.door_floor_2,
    Yard_sign: nodes.yard_sign,
    Text_desc: nodes.text_desc,
    Text_qr_code002: nodes.text_qr_code002,
    Exhibition_continues_1: nodes.exhibition_continues_1,
    Exhibition_continues_2: nodes.exhibition_continues_2,
  }

  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.bottom_walls.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={smearedWallMap}
          normalMap={smearedWallNormal}
          aoMap={bottomWalls_AO}
          aoMapIntensity={0.2}
          lightMap={bottomWalls_LM}
          lightMapIntensity={1.5}
          envMapIntensity={0.1}
        />
      </mesh>
      <mesh
        geometry={nodes.inside_wall.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={smearedWallMap}
          normalMap={smearedWallNormal}
          aoMap={insideWall_AO}
          aoMapIntensity={0.2}
          lightMap={insideWall_LM}
          lightMapIntensity={1.5}
          envMapIntensity={0.1}
        />
      </mesh>
      <mesh
        geometry={nodes.top_walls.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={smearedWallMap}
          normalMap={smearedWallNormal}
          aoMap={topWalls_AO}
          aoMapIntensity={0.2}
          lightMap={topWalls_LM}
          lightMapIntensity={1.5}
          envMapIntensity={0.1}
        />
      </mesh>
      <CubeCamera
        frames={1}
        position={[0, 0.01, 0]}
        rotation={[0, 0, 0]}
        resolution={2048}
        near={1}
        far={1000}
      >
        {(texture) => (
          <>
            <mesh
              geometry={nodes.ground_floor_1.geometry}
              position={[0, 0, 0]}
              receiveShadow
              dispose={null}
            >
              <meshStandardMaterial
                map={groundConcreteMap}
                // normalMap={groundConcreteNormal}
                // normalMap-encoding={THREE.LinearSRGBColorSpace}
                roughnessMap={groundConcreteRoughness}
                aoMap={groundFloor_1_AO}
                aoMapIntensity={0.2}
                lightMap={groundFloor_1_LM}
                lightMapIntensity={0.2}
                envMap={texture}
                envMapIntensity={0.2}
                roughness={0.4}
                metalness={0}
                // envMapRotation-z={Math.PI}
                // envMapRotation-x={Math.PI / 3}
                {...projection}
              />
            </mesh>
            <mesh
              geometry={nodes.ground_floor_2.geometry}git 
              position={[0, 0, 0]}
            >
              <meshStandardMaterial
                map={groundConcreteMap}
                // normalMap={groundConcreteNormal}
                roughnessMap={groundConcreteRoughness}
                aoMap={groundFloor_2_AO}
                aoMapIntensity={0.2}
                lightMap={groundFloor_2_LM}
                lightMapIntensity={0.2}
                envMap={texture}
                envMapIntensity={0.4}
                roughness={0.4}
                metalness={0}
              />
            </mesh>
          </>
        )}
      </CubeCamera>

      <Merged
        meshes={stuffMeshes}
        receiveShadow
        castShadow
        frustumCulled={false}
      >
        {({
          Image_1_front,
          Image_2_front,
          Image_3_front,
          Image_4_front,
          Image_5_front,
          Single_lamp,
          Lamps013,
          Lamps005,
          Bench1_2,
          Door_knock,
          Paint_Hanger,
          PictureFrame01_MDL_nar_blinn2_0001,
          Cube_lamp_1,
          Door_floor_1,
          Yard_sign,
          Text_desc,
          Text_qr_code002,
          Exhibition_continues_1,
          Exhibition_continues_2,
        }) => (
          <>
            <Image_1_front />
            <Image_2_front />
            <Image_3_front />
            <Image_4_front />
            <Image_5_front />
            <>
              <Single_lamp
                position={[-1.633, 3.256, -4.81]}
                rotation={[0, -0.975, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-0.286, 3.256, -4.81]}
                rotation={[0, -1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[1.497, 3.256, -4.81]}
                rotation={[0, 1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.958, 3.256, -1.634]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.958, 3.256, -3.412]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.979, 3.256, 4.668]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.979, 3.256, 2.802]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.979, 3.256, 0.826]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[2.055, 3.256, 5.408]}
                rotation={[-Math.PI, 0.603, -Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[0.189, 3.256, 5.408]}
                rotation={[0, 0.915, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-1.593, 3.256, 5.408]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-2.152, 7.587, -4.81]}
                rotation={[0, 1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[-0.286, 7.587, -4.81]}
                rotation={[0, -1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[1.497, 7.587, -4.81]}
                rotation={[0, 1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[4.661, 3.761, -1.176]}
                rotation={[0.019, -0.008, 2.085]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[4.669, 3.579, -4.087]}
                rotation={[-3.09, -0.107, 2.079]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Single_lamp
                position={[4.627, 3.761, 2.705]}
                rotation={[0.019, -0.008, 2.085]}
                scale={[2.536, 2.536, 2.065]}
              />
            </>
            <>
              <Lamps013 />
              <Lamps005
                position={[0.944, 3.261, -4.796]}
                rotation={[0, 1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Lamps005
                position={[-2.945, 3.261, -2.926]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Lamps005
                position={[-2.965, 3.261, 1.572]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Lamps005
                position={[-1.041, 3.261, 5.395]}
                rotation={[0, -1.571, 0]}
                scale={[2.536, 2.536, 2.065]}
              />
              <Lamps005
                position={[4.728, 3.666, -1.908]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[2.536, 2.536, 2.065]}
              />
            </>
            <Bench1_2 position={[4.601, 0.356, 5.697]} />
            <Bench1_2
              position={[-5.276, 0.357, -4.837]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <Door_knock />
            <Paint_Hanger
              position={[0.151, 3.288, -3.95]}
              rotation={[0, -0.45, 0]}
              scale={0.811}
            />
            <Paint_Hanger
              position={[-1.253, 3.288, -0.98]}
              rotation={[Math.PI, -0.664, Math.PI]}
              scale={0.811}
            />
            <PictureFrame01_MDL_nar_blinn2_0001 />
            <Cube_lamp_1 />
            <Cube_lamp_1 position={[0, 0, -4.87662]} />
            <Door_floor_1 position={[0, -0.01, 0]} />
            <Door_floor_1
              position={[-6.9, 3.52942, 0]}
              scale={[1.03, 1.03, 1]}
            />
            <Yard_sign />
            <Text_desc />
            <Text_qr_code002 />
            <Exhibition_continues_1 />
            <Exhibition_continues_2 />
          </>
        )}
      </Merged>
    </group>
  )
}

useGLTF.preload('/bavan_gallery_final.glb')
