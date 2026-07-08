'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Construction } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/data/images'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.bgProjects}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-6"
          >
            <h1 className="text-[8rem] sm:text-[12rem] font-bold leading-none gradient-text">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Construction className="w-20 h-20 sm:w-28 sm:h-28 text-primary/10" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
          >
            <Construction className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">
              Sayfa Bulunamadı
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            <span className="text-foreground">Bu Sayfa </span>
            <span className="gradient-text">İnşa Edilmedi</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg mb-10 max-w-lg mx-auto"
          >
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            Ana sayfaya dönerek devam edebilir veya bir adım geri gidebilirsiniz.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-3"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-border/50 text-foreground hover:text-primary hover:border-primary/30 font-semibold px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/5"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Belki şu sayfalara bakmak istersiniz:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: '/projeler', label: 'Projeler' },
                { href: '/hizmetler', label: 'Hizmetler' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all border border-white/5 hover:border-primary/20"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
