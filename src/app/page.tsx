'use client'

import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import NewsAnnouncements from '@/components/sections/NewsAnnouncements'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Projects />
      <NewsAnnouncements />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </>
  )
}
