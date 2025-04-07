import { create } from 'zustand'


interface AnimationState {
  currentPainting: number
  setCurrentPainting: (currentPainting: number) => void
  scrollSign: boolean
  setScrollSign: (scrollSign: boolean) => void
  introCompleted: boolean
  setIntroCompleted: (introCompleted: boolean) => void
  inputGroupVisible: boolean
  setInputGroupVisible: (inputGroupVisible: boolean) => void
}

export const useAnimationStore = create<AnimationState>((set) => ({
  currentPainting: 0,
  setCurrentPainting: (currentPainting) => set({ currentPainting }),
  scrollSign: true,
  setScrollSign: (scrollSign) => set({ scrollSign }),
  introCompleted: false,
  setIntroCompleted: (introCompleted) => set({ introCompleted }),
  inputGroupVisible: true,
  setInputGroupVisible: (inputGroupVisible) => set({ inputGroupVisible }),
}))
