'use client'

// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import {  useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// import { project } from '../../src/components/canvas/Scene'
import { useLenis } from 'lenis/react'
import { useCurrentSheet } from '@theatre/r3f'
import { useAnimationStore } from 'lib/store/useAnimationStore'
import { theatreRafDriver } from '@/components/canvas/CustomRafDriver'


const { damp } = THREE.MathUtils

export const ScrollTicker = ({ smooth = 9999999 }) => {

  const bavanGallerySheet = useCurrentSheet()
  const introCompleted = useAnimationStore(state => state.introCompleted)
  const inputGroupVisible = useAnimationStore((state) => state.inputGroupVisible)

  const lenis = useLenis()
  const scrollProgress = useRef(0)
  const scrollTop = useRef(0)
  const animationComplete = useRef(false)
  const totalAnimation = 32


  const updateScrollState = () => {
    // if(scrollTop.current < (lenis.limit - 10)  && animationComplete.current) {
    //   animationComplete.current = false
    // }
    // if (scrollTop.current = (lenis.limit  )  && !animationComplete.current && introCompleted) {
    //   const resetPoint = ((11 + 10/30) / (31 + 10/30)) * lenis.limit  // 20% of total height
    //   lenis.scrollTo(resetPoint, {
    //     immediate: true,
    //   }) // Reset without transition
    //   scrollTop.current = resetPoint
    //   scrollProgress.current = (11 + 10 / 30) / totalAnimation
    //   animationComplete.current = true
    // }
  }


useEffect(() => {
  lenis.scrollTo(((4 + 2 /30 )/ totalAnimation) * lenis.limit, {
    immediate: true,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}, [inputGroupVisible])


const scrollFinished = useRef(false)

// useEffect(() => {
    lenis.on('scroll', ({ scroll, progress }) => {
           if (introCompleted) {
             scrollTop.current = scroll
             scrollProgress.current = progress
            //  updateScrollState()

    if (scrollProgress.current * totalAnimation < (3 + 29 / 30) ) {
      lenis.scrollTo( 4  / totalAnimation * lenis.limit, {
        immediate: true
      })
    }
    if(scrollProgress.current  > 0.92 && !scrollFinished.current) {
      scrollFinished.current = true
      lenis.scrollTo( (31 + 20) / totalAnimation * lenis.limit, {
        immediate: false,
        duration: 4,
        lock: true,
        onComplete: () => {
          const resetPoint = ((11 + 10 / 30) / totalAnimation) * lenis.limit // 20% of total height
          lenis.scrollTo(resetPoint, {
            immediate: true,
          }) // Reset without transition
          scrollTop.current = resetPoint
          scrollProgress.current = (11 + 10 / 30) / totalAnimation
          animationComplete.current = true
          scrollFinished.current = false
        }
      })
    }
             
           }
    })
  //   return () => {
  //     lenis.destroy()
  //   }
  // }
  // , [lenis])

  
  useFrame(( {viewport, clock}, delta) => {
    
  const now = performance.now()
  // Tick Theatre
  theatreRafDriver.tick(now)

  // Tick Lenis
  lenis?.raf(now)

    if (introCompleted && (scrollProgress.current * totalAnimation > 3 + 29 / 30) ) {
      bavanGallerySheet.sequence.position = damp(
        bavanGallerySheet.sequence.position,
        scrollProgress.current * totalAnimation,
        smooth,
        delta
      )
      // detectStops(delta)
      //  bavanGallerySheet.sequence.position = scrollProgress.current * totalAnimation
    }
  })

  return null
}


