import { useLenis } from "lenis/react"
import { useAnimationStore } from "lib/store/useAnimationStore"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function ScrollSignAnimation() {

	// const scrollSign = useAnimationStore(state => state.scrollSign)
	const currentPainting = useAnimationStore(state => state.currentPainting)
	const introCompleted = useAnimationStore(state => state.introCompleted)
	const lenis = useLenis()
	const [scrollSign, setScrollSign] = useState(true)
	const scrollProgress = useRef(0)

	const detectStops = () => {
		if (!lenis) return
		if (lenis.velocity < 0.1 && lenis.velocity > -0.1 && !scrollSign) {
			setScrollSign(true)
		}
		else if ((lenis.velocity > 0.1 || lenis.velocity < -0.1) && scrollSign) {
			setScrollSign(false)
		}
	}

useEffect(()=> {
		if(!lenis) return
		lenis.on('scroll', ({ scroll, progress }) => {
			// if (introCompleted) {
				scrollProgress.current = progress
				detectStops()
			// }
		})
		return () => {
			lenis.destroy()
		  }
	},[lenis])

	return (
		<>
			<AnimatePresence>
				{
					scrollSign && currentPainting === 0 && introCompleted &&
					<>				
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							// key={currentPainting}
							className=" flex w-10 h-16 lg:w-16 lg:h-24 justify-center items-center border-neutral-900 rounded-full backdrop-blur-lg z-50"
							style={{
								borderWidth: 4,
								borderColor: '#171717'
							}}
						>
							<motion.div
								initial={{ y: -15, opacity: 1, height: 16 }}
								animate={{ y: 2, opacity: 0.1, height: 8 }}
								transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 0.6, ease: 'easeOut' }}
								className=" flex w-[6px] h-4 bg-neutral-900 rounded-full"
								style={{
									width: 6,
									height: 16,
									backgroundColor: '#171717'
								}}
							/>

						</motion.div>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className=" text-base lg:text-xl font-baumans font-semibold flex w-fit items-center justify-center px-4 lg:px-6 py-2 backdrop-blur-lg shadow-sm shadow-neutral-700 rounded-3xl"
							style={{ 
								color: '#171717 ', 
								borderRadius: '1.5rem'
							 }}
						> SWIPE/SCROLL TO MOVE</motion.span>
						
					</>
				}
			</AnimatePresence>
		</>
	)
}
