'use client'

import { LenisRef, ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef } from 'react'
import { useTempus } from 'tempus/react'

export default function ClientLenis({ children }: { children: ReactNode }) {

	const lenisRef = useRef<LenisRef>(null)

	// useTempus((time: number) => {
	// 	if (lenisRef.current?.lenis) {
	// 		lenisRef.current.lenis.raf(time)
	// 	}
	// })
	// if(lenisRef.current?.lenis){
	// 	const now = performance.now()
	// 	lenisRef.current.lenis.raf(now)
	// }


	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{
				duration: 1.4,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// lerp: 0.8,              // lower value for quicker interpolation
				gestureOrientation: 'vertical',
				orientation: 'vertical',
				smoothWheel: true,      // enable smooth wheel events
				wheelMultiplier: 0.7,     // adjust if needed based on your experience
				syncTouch: true,  // better sync between touch and scroll
				// syncTouchLerp: 0.075,      // optional: sync touch lerp if supported
				// touchInertiaMultiplier: 2, // lower inertia for a smoother touch experience
				// touchMultiplier: 0.8,
				// infinite: true,
				autoRaf:false
			}}
		>
			{children}
		</ReactLenis>
	)
}