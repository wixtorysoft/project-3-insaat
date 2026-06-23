'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Heart, Shield, Leaf, Users, Scale } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const valueIcons = [Heart, Shield, Lightbulb, Leaf, Users, Scale]

export default function VisionMissionPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/bg-corporate.png" alt="Vizyon & Misyon" className="w-full h-full object-cover" />
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
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.corporate.visionMission.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.visionMission.title1} </span>
              <span className="gradient-text">{t.corporate.visionMission.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.corporate.visionMission.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass card-hover-lift shine-effect rounded-2xl p-8 sm:p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-6">
                  {t.corporate.visionMission.visionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                  {t.corporate.visionMission.visionText1}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t.corporate.visionMission.visionText2}
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass card-hover-lift shine-effect rounded-2xl p-8 sm:p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-6">
                  {t.corporate.visionMission.missionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                  {t.corporate.visionMission.missionText1}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t.corporate.visionMission.missionText2}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
              {t.corporate.visionMission.valuesTitle}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.corporate.visionMission.values.map((value, index) => {
              const Icon = valueIcons[index] || Heart
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="glass card-hover shine-effect rounded-2xl p-6 text-center h-full group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary icon-hover" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
