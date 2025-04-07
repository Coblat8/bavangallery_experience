'use client'

import Scene from "@/components/canvas/Scene"
import HtmlContainer from "@/components/html/HtmlContainer"
import ScrollSignAnimation from "@/components/html/ScrollSignAnimation"
import { useLenis } from "lenis/react"
import {  useEffect } from 'react'

export default function Page() {

  const lenis = useLenis()

  useEffect(() => {
    if(lenis)
    lenis.scrollTo(1,{immediate:true})
  },[lenis])

 
  return (
    <>
      <div className="relative flex flex-col w-screen justify-center items-center h-[2500vh] shrink-0 overflow-x-hidden ">
        {/* <Scroll > */}
        <Scene
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
        />

        <HtmlContainer />
        <div className=" fixed top-[70vh] left-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-2 h-56 w-72 shrink-0 z-40"
          style={{
            borderRadius: '1.5rem',
            height: '14rem',
            width: '20rem'
          }}
        >
        <ScrollSignAnimation />
        </div>
      </div>
    </>
  )
}
