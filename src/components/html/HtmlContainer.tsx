'use client'

import { useIsClient } from '@uidotdev/usehooks'
import { useLenis } from 'lenis/react'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export default function HtmlContainer() {

	const inputGroupVisible = useAnimationStore(state => state.inputGroupVisible)
	const currentPainting = useAnimationStore(state => state.currentPainting)
	const isClient = useIsClient()
	const lenis = useLenis()
	const setCurrentPainting = useAnimationStore(state => state.setCurrentPainting)

	const scrollProgress = useRef(0)
	const totalAnimation = 31 + 10/30

	// const [currentPainting , setCurrentPainting] = useState(0)

	const stopPoints = {
		stop1_start: 18 + 0 / 30,
		stop1_end: 18 + 25 / 30,
		stop1_next: 19 + 9 / 30,
		stop2_start: 20 + 0 / 30,
		stop2_end: 21 + 9 / 30,
		stop2_next: 21 + 25 / 30,
		stop3_start: 22 + 20 / 30,
		stop3_end: 23 + 25 / 30,
		stop3_next: 24 + 10 / 30,
		stop4_start: 24 + 25 / 30,
		stop4_end: 25 + 25 / 30,
		stop4_next: 26 + 10 / 30,
		stop5_start: 27 + 15 / 30,
		stop5_end: 28 + 25 / 30,
		stop5_next: 29 + 10 / 30,
	}

	const detectStops = () => {
		if(!lenis) return
		if (
			scrollProgress.current * totalAnimation > stopPoints.stop1_start &&
			scrollProgress.current * totalAnimation < stopPoints.stop1_next + 20 / 30
		) {
			if (scrollProgress.current * totalAnimation < stopPoints.stop1_end) {
			if (lenis.direction === 1) {
				// lenis.scrollTo((stopPoints.stop1_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 3,
				//   // lock:true,
				//   duration: 6,
				//   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),    
				//   onStart: () => {
					setCurrentPainting(1)
					// lenis.options.prevent = false 
				// },
				// onComplete: () => {lenis.options.prevent = true}
				// }
			// )
			} else {
				if (scrollProgress.current * totalAnimation < stopPoints.stop1_end - 10 / 30) {
				setCurrentPainting(0)
				}
			}
			} else if (
			scrollProgress.current * totalAnimation >= stopPoints.stop1_end &&
			scrollProgress.current * totalAnimation <= stopPoints.stop1_next
			) {
			setCurrentPainting(1)
			} else if (
			scrollProgress.current * totalAnimation > stopPoints.stop1_next &&
			scrollProgress.current * totalAnimation < stopPoints.stop1_next + 20 / 30
			) {
			if (lenis.direction === 1) {
				setCurrentPainting(0)
			} else if (lenis.direction === -1) {
				
				// lenis.scrollTo((stopPoints.stop1_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 6,
				//   onStart: () => {
					setCurrentPainting(1)
					// lenis.options.prevent = true
				//   },
				//   onComplete: () => {
				//     // lenis.options.prevent = false
				//   },
				// })
			}
			}
		}

		// second painting
		else if (
			scrollProgress.current * totalAnimation > stopPoints.stop2_start &&
			scrollProgress.current * totalAnimation < stopPoints.stop2_next + 20 / 30
		) {
			if (scrollProgress.current * totalAnimation < stopPoints.stop2_end) {
			if (lenis.direction === 1) {
				
				// lenis.scrollTo((stopPoints.stop2_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 6,
				//   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// onStart: () => 
					setCurrentPainting(2)
				// onComplete: () => {
					// lenis.options.prevent = false
				// },
				// })
			} else {
				if (scrollProgress.current * totalAnimation < stopPoints.stop2_end - 10 / 30) {
				setCurrentPainting(0)
				}
			}
			} else if (
			scrollProgress.current * totalAnimation >= stopPoints.stop2_end &&
			scrollProgress.current * totalAnimation <= stopPoints.stop2_next
			) {
			setCurrentPainting(2)
			} else if (
			scrollProgress.current * totalAnimation > stopPoints.stop2_next &&
			scrollProgress.current * totalAnimation < stopPoints.stop2_next + 20 / 30
			) {
			if (lenis.direction === 1) {
				setCurrentPainting(0)
			} else if (lenis.direction === -1) {
				
				// lenis.scrollTo((stopPoints.stop2_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 3.0,
				//   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// onStart: () => 
					setCurrentPainting(2)
				//   onComplete: () => {
				//     lenis.options.prevent = false
				//   },
				// })
			}
			}
		}

		// third painting
		else if (
			scrollProgress.current * totalAnimation > stopPoints.stop3_start &&
			scrollProgress.current * totalAnimation < stopPoints.stop3_next + 20 / 30
		) {
			if (scrollProgress.current * totalAnimation < stopPoints.stop3_end) {
			if (lenis.direction === 1) {
				
				// lenis.scrollTo((stopPoints.stop3_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 6,
				//   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// onStart: () => 
					setCurrentPainting(3)
				//   onComplete: () => {
				//     lenis.options.prevent = false
				//   },
				// })
			} else {
				if (scrollProgress.current * totalAnimation < stopPoints.stop3_end - 10 / 30) {
				setCurrentPainting(0)
				}
			}
			} else if (
			scrollProgress.current * totalAnimation >= stopPoints.stop3_end &&
			scrollProgress.current * totalAnimation <= stopPoints.stop3_next
			) {
			setCurrentPainting(3)
			} else if (
			scrollProgress.current * totalAnimation > stopPoints.stop3_next &&
			scrollProgress.current * totalAnimation < stopPoints.stop3_next + 10 / 30
			) {
				if (lenis.direction === 1) {
					setCurrentPainting(0)
				} else if (lenis.direction === -1) {
					
					// lenis.scrollTo((stopPoints.stop3_next / totalAnimation) * lenis.limit, {
					//   immediate: false,
					//   duration: 6,
					// easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					// onStart: () => 
						setCurrentPainting(3)
					//   onComplete: () => {
					//     lenis.options.prevent = false
					//   },
					// })
				// }
				}
			}
		}

		// 4rd painting
		else if (
			scrollProgress.current * totalAnimation > stopPoints.stop4_start - (10 / 30) &&
			scrollProgress.current * totalAnimation < stopPoints.stop4_next + (20 / 30)
		) {
			if (scrollProgress.current * totalAnimation < stopPoints.stop4_end -(10/30)) {

				if (lenis.direction === 1) {
					
					// lenis.scrollTo((stopPoints.stop4_next / totalAnimation) * lenis.limit, {
					//   immediate: false,
					//   duration: 6,
					//   // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					// onStart: () => 
						setCurrentPainting(4)
					//   onComplete: () => {
					//     lenis.options.prevent = false
					//   },
					// })
				} else {
					if (scrollProgress.current * totalAnimation < stopPoints.stop4_end -(10 / 30)) {
					setCurrentPainting(0)
					}
				}
			} else if (
			scrollProgress.current * totalAnimation >= stopPoints.stop4_end &&
			scrollProgress.current * totalAnimation <= stopPoints.stop4_next
			) {
			setCurrentPainting(4)
			} else if (
			scrollProgress.current * totalAnimation > stopPoints.stop4_next &&
			scrollProgress.current * totalAnimation < stopPoints.stop4_next + 20 / 30
			) {
				if (lenis.direction === 1) {
					setCurrentPainting(0)
				} else if (lenis.direction === -1) {
					
					// lenis.scrollTo((stopPoints.stop4_next / totalAnimation) * lenis.limit, {
					//   immediate: false,
					//   duration: 6,
					// easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					// onStart: () => 
						setCurrentPainting(4)
					//   onComplete: () => {
					//     lenis.options.prevent = false
					//   },
					// })
				}
			}
		}

		// 5th painting
		else if (
			scrollProgress.current * totalAnimation > stopPoints.stop5_start &&
			scrollProgress.current * totalAnimation < stopPoints.stop5_next + 1
		) {
			if (scrollProgress.current * totalAnimation < stopPoints.stop5_end) {
			if (lenis.direction === 1) {
				
				// lenis.scrollTo((stopPoints.stop5_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 6,
				// easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// onStart: () => 
					setCurrentPainting(5)
				//   onComplete: () => {
				//     lenis.options.prevent = false
				//   },
				// })
			} else {
				if (scrollProgress.current * totalAnimation < stopPoints.stop5_end - 10 / 30) {
				setCurrentPainting(0)
				}
			}
			} else if (
			scrollProgress.current * totalAnimation >= stopPoints.stop5_end &&
			scrollProgress.current * totalAnimation <= stopPoints.stop5_next
			) {
			setCurrentPainting(5)
			} else if (
			scrollProgress.current * totalAnimation > stopPoints.stop5_next &&
			scrollProgress.current * totalAnimation < stopPoints.stop5_next + 1
			) {
			if (lenis.direction === 1) {
				setCurrentPainting(0)
			} else if (lenis.direction === -1) {
				
				// lenis.scrollTo((stopPoints.stop5_next / totalAnimation) * lenis.limit, {
				//   immediate: false,
				//   duration: 6,
				// easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				// onStart: () => 
					setCurrentPainting(5)
				//   onComplete: () => {
				//     lenis.options.prevent = false
				//   },
				// })
			}
			}
		}
		
	}

	useEffect(()=> {
		if(!lenis) return
		lenis.on('scroll', ({ scroll, progress }) => {
			// if (inputGroupVisible) {
				scrollProgress.current = progress
				detectStops()
			// }
		})
		return () => {
			lenis.destroy()
		  }
	},[lenis])


	if(!isClient) return null

	const isMobile = window.innerWidth < 768



	return (
		<>
			<AnimatePresence>
				{currentPainting !== 0 &&
					<motion.div
						initial={{ 
							// opacity: 1, 
							x: isMobile ? '-50%' : 200, 
							y: isMobile ? 300  : '-50%' 
						}}
						animate={{ 
							// opacity: 1, 
							x: isMobile ? '-50%' : 0, 
							y: isMobile ? 0 : '-50%' 
						}}
						exit={{ 
							// opacity: 0, 
							x: isMobile ? '-50%' : 800,
							y: isMobile ? 300 : '-50%' 
							}}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						key={currentPainting}
						id="html-container"
						className='fixed top-[65vh] lg:top-1/2 lg:-translate-y-1/2 left-1/2 lg:left-auto lg:right-40   flex flex-col shrink-0 items-start justify-start gap-4 w-full h-full lg:w-[34rem] lg:h-[36rem] rounded-[2rem] lg:rounded-2xl z-50 '
						>
						<div className=' text_card absolute flex w-full h-full bg-neutral-200/30 lg:bg-neutral-500/20 z-30' 
						/>
						<div className=" flex flex-col gap-4 pt-8 lg:pt-16 z-40">
							<div className=' flex w-full h-full items-center '>
								<motion.h2
									initial={{ opacity: 0, y: isMobile ? 0 : -50, }}
									animate={{ opacity: 1, y: 0, }}
									exit={{ opacity: 0, y: isMobile? 0 : -50, }}
									transition={{ duration: 0.5, delay:isMobile ? 0.6 : 0.2, ease: 'easeOut' }}
									className=" w-full text-2xl lg:text-[2rem] lg:leading-10 font-baumans font-bold pl-8 lg:px-16"> {`Artwork ${currentPainting}`} 
								</motion.h2>
								<span className=" flex lg:hidden text-xs w-fit  font-outfit text-neutral-900/70 pr-8 "> untitiled, Sepideh Farzam, 2025</span>
							</div>
							<motion.p
								initial={{ opacity: 0, }}
								animate={{ opacity: 1, }}
								exit={{ opacity: 0, }}
								transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
								className=" text-base lg:text-xl text-pretty font-outfit text-neutral-950/90 px-8 lg:px-16">
								{isMobile ? 'Created entirely from woven wool, this piece replaces traditional brushstrokes with layered fibers. ' : 'Created entirely from woven wool, this piece replaces traditional brushstrokes with layered fibers. The rich crimson shapes emerge organically, resembling natural patterns or cellular forms.'}
							</motion.p>
							<span className=" hidden lg:flex text-xs lg:text-base font-outfit text-neutral-900/70 pt-2 lg:py-6 px-16"> untitiled, Sepideh Farzam, 2025</span>
						</div>
						<div className="hidden md:block w-full h-[2px] bg-neutral-900/50 z-40" />
						<div className=" hidden md:flex flex-col w-full h-fit justify-start items-start gap-4 px-16 font-teko z-40">
							<span className=" text-3xl pt-4"> VISIT US DURING ART FAIRS</span>
							<button className=" bg-black text-slate-200 text-xl rounded-md px-8 py-2 "> Enter </button>
						</div>
					</motion.div>}
			</AnimatePresence>
		</>
	)
}
