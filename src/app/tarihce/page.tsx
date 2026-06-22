'use client'

import { motion } from 'framer-motion'
import { History, Flag, Building2, Award, TrendingUp } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { IMAGES } from '@/data/images'

const milestoneIcons = [Flag, Building2, Building2, Award, Building2, TrendingUp, Award, Building2, Flag]

export default function HistoryPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgCorporate} alt="Tarihçe" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <History className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.corporate.history.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.history.title1} </span>
              <span className="gradient-text">{t.corporate.history.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.corporate.history.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent sm:-translate-x-0.5" />

            <div className="space-y-8 sm:space-y-12">
              {t.corporate.history.timeline.map((item, index) => {
                const Icon = milestoneIcons[index] || Flag
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-start gap-4 sm:gap-8 ${
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10 group/dot hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content - Mobile: right side, Desktop: alternating */}
                    <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'}`}>
                      <div className="glass card-hover rounded-2xl p-5 sm:p-6">
                        <span className="inline-block text-sm font-bold text-primary mb-2">{item.year}</span>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
