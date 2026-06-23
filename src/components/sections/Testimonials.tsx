'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { testimonials, partnerCompanies } from '@/data/content'

export default function Testimonials() {
  const { locale, t } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="section-divider mb-16" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">{t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">{t.testimonials.title1} </span>
            <span className="gradient-text">{t.testimonials.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t.testimonials.description}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="glass card-hover pulse-ring-hover rounded-2xl p-8 sm:p-12"
              >
                <Quote className="w-10 h-10 text-primary/30 mb-6" />

                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                  &ldquo;{locale === 'en' ? current.contentEn : current.content}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover/avatar:bg-primary/20 transition-all duration-300">
                      <span className="text-lg font-bold text-primary group-hover/avatar:scale-110 transition-transform duration-300">
                        {current.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {current.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'en' ? current.roleEn : current.role}, {current.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-border/50 hover:border-primary/30 hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`${t.testimonials.badge} ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-border/50 hover:border-primary/30 hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border/50"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">{t.testimonials.trustedPartners}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-50">
            {partnerCompanies.map((name) => (
              <div key={name} className="text-lg sm:text-xl font-bold text-muted-foreground/50 hover:text-primary/70 transition-all duration-300 hover:scale-105 cursor-default">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
