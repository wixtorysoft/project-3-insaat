'use client'

import { motion } from 'framer-motion'
import { Building2, Home, Factory, Ruler, Hammer, TreePine, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

const serviceIcons = [Building2, Home, Factory, Ruler, Hammer, TreePine]

export default function ServicesPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/bg-services.png" alt="Hizmetler" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{t.services.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.services.title1} </span>
              <span className="gradient-text">{t.services.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.services.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index]
            const detail = t.services.detailedDesc[index]
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id={`service-${index}`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="group/card glass card-hover-lift shine-effect rounded-2xl p-8 sm:p-10">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover/card:bg-primary/20 transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary icon-hover" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">{detail.fullDesc}</p>
                      
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{t.services.badge}</h3>
                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 group/feat cursor-default">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 group-hover/feat:scale-125 transition-transform duration-300" />
                            <span className="text-sm text-muted-foreground group-hover/feat:text-foreground/80 transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                        <Link href="/iletisim">
                          {t.nav.getOffer}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-xl" />
                      <div className="relative glass card-hover rounded-2xl p-6 sm:p-8">
                        <h4 className="font-semibold text-foreground mb-4">
                          {detail.process.length > 0 ? (typeof detail.process[0] === 'string' ? 'Süreç' : 'Process') : 'Süreç'}
                        </h4>
                        <div className="space-y-4">
                          {detail.process.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-4 group/step cursor-default">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/step:bg-primary/20 group-hover/step:scale-110 transition-all duration-300">
                                <span className="text-sm font-bold text-primary">{stepIndex + 1}</span>
                              </div>
                              <div>
                                <p className="text-foreground font-medium group-hover/step:text-primary transition-colors duration-300">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
