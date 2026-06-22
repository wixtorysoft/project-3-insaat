'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/components/sections/Navbar'), { ssr: false })

export default function DynamicNavbar() {
  return <Navbar />
}
