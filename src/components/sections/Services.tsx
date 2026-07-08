'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Home,
  Factory,
  Ruler,
  Hammer,
  TreePine,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const serviceIcons = [Building2, Home, Factory, Ruler, Hammer, TreePine]

export default function Services() {
  const { t } = useI18n()

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="section-divider mb-16" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">{t.services.title1} </span>
            <span className="gradient-text">{t.services.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass card-hover-lift shine-effect rounded-2xl p-6 sm:p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary icon-hover" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
