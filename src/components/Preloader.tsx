'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { HardHat } from 'lucide-react'

export default function Preloader() {
  const pathname = usePathname()
  // Initial true - ilk yüklemede preloader göster
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Her route değişiminde 300ms preloader göster
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 300)

    return () => {
      clearTimeout(timer)
      // Route değişince cleanup tetiklenir, preloader tekrar görünür
      setShowPreloader(true)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background pointer-events-none"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(oklch(0.78 0.164 70) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.164 70) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <HardHat className="w-9 h-9 sm:w-11 sm:h-11 text-primary" />
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-2xl border-2 border-primary"
              />
            </motion.div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold tracking-tight gradient-text">
                WIXTORY
              </div>
              <div className="text-[10px] text-white/50 -mt-1 tracking-widest">
                İNŞAAT
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="w-32 h-1 rounded-full bg-white/10 overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-amber-400"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
