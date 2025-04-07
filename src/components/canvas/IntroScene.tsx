
import { useFrame } from '@react-three/fiber'
import { editable as e } from '@theatre/r3f'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import { useRef } from 'react'
import * as THREE from 'three'
import { BavanLogo } from './BavanLogo'


export default function IntroScene() {


	const spotLightTargetRef = useRef(new THREE.Object3D())
	const spotLightRef = useRef<THREE.SpotLight>(null)
	const directionalLightRef = useRef(null)
	spotLightTargetRef.current.position.set(0.19, 1.8, 4.55)
	const inputGroupVisible = useAnimationStore(state => state.inputGroupVisible)

	useFrame(() => {
		// Setup spotlight target once
		if (spotLightRef.current && spotLightRef.current.target !== spotLightTargetRef.current) {
			spotLightRef.current.target = spotLightTargetRef.current
			spotLightRef.current.target.updateMatrixWorld()
		}

	})

	return (
		<group>
			{inputGroupVisible &&

				<group>
					<e.directionalLight
						ref={directionalLightRef}
						theatreKey="Direction_light"
						color={new THREE.Color(0xffffff)}
						intensity={1}
						position={[0, 10, 0]}
					/>

					<e.spotLight
						ref={spotLightRef}
						theatreKey="spotLight"
						intensity={50}
						penumbra={2}
						decay={0.5}
						color={new THREE.Color(0xffffff)}
						castShadow
						position={[1.2, 0.5, 0.7]}
						distance={10}
						angle={0.3}
					/>
					{/* Both groups are rendered, but we control visibility with refs */}

					<BavanLogo />

				</group>
			}
		</group>
	)
}
