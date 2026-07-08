'use client'

import dynamic from 'next/dynamic'

const Preloader = dynamic(() => import('./Preloader'), { ssr: false })

export default function DynamicPreloader() {
  return <Preloader />
}
