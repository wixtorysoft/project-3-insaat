'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

export default function Hero() {
  const { t } = useI18n()

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero-construction.png"
          alt="İnşaat Projesi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">{t.hero.experience}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">{t.hero.title1} </span>
              <span className="gradient-text">{t.hero.title2}</span>
              <br />
              <span className="text-foreground">{t.hero.title3}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-12 group"
              >
                <Link href="/projeler">
                  {t.hero.projectsBtn}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/30 text-primary hover:bg-primary/10 font-semibold text-base px-8 h-12 group"
              >
                <Link href="/hakkimizda">
                  <Play className="w-4 h-4 mr-2" />
                  {t.hero.videoBtn}
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 group/badge cursor-default">
                <Shield className="w-5 h-5 text-primary group-hover/badge:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover/badge:text-foreground transition-colors duration-300">{t.hero.iso}</span>
              </div>
              <div className="flex items-center gap-2 group/badge cursor-default">
                <Award className="w-5 h-5 text-primary group-hover/badge:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover/badge:text-foreground transition-colors duration-300">{t.hero.tse}</span>
              </div>
              <div className="flex items-center gap-2 group/badge cursor-default">
                <Clock className="w-5 h-5 text-primary group-hover/badge:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover/badge:text-foreground transition-colors duration-300">{t.hero.onTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl" />
              <div className="relative glass card-hover rounded-2xl p-8 space-y-6">
                <h3 className="text-lg font-semibold text-foreground">{t.hero.ongoingProjects}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Skyline Residence</span>
                      <span className="text-primary font-medium">%78</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all duration-1000" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Marina Tower</span>
                      <span className="text-primary font-medium">%45</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all duration-1000" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Green Valley Villas</span>
                      <span className="text-primary font-medium">%92</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary rounded-full h-2 transition-all duration-1000" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.hero.totalValue}</span>
                    <span className="text-2xl font-bold gradient-text">₺2.4B</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
