'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Target, Eye, Users, Award, Shield } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { companyInfo } from '@/data/content'

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/about-team.png" alt="Hakkımızda" className="w-full h-full object-cover" />
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
              <span className="text-sm font-medium text-primary">{t.about.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.about.title1} </span>
              <span className="gradient-text">{t.about.title2}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">{t.about.ourStory}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t.about.storyText1}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{t.about.storyText2}</p>
              <p className="text-muted-foreground leading-relaxed">{t.about.storyText3}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
                <img
                  src="/images/about-team.png"
                  alt="Wixtory İnşaat Ekibi"
                  className="relative rounded-2xl w-full object-cover shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">{t.about.ourValues}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass card-hover shine-effect rounded-2xl p-6 text-center h-full group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    {[Target, Shield, Award, Users][index] && 
                      (() => {
                        const Icon = [Target, Shield, Award, Users][index]
                        return <Icon className="w-6 h-6 text-primary icon-hover" />
                      })()
                    }
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.about.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 glass card-hover rounded-xl p-4 group/feat cursor-default"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover/feat:scale-125 transition-transform duration-300" />
                <span className="text-sm text-foreground group-hover/feat:text-primary transition-colors duration-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 gradient-text">{t.about.team}</h2>
            <div className="glass card-hover pulse-ring-hover rounded-2xl p-8 sm:p-12 group">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                <span className="text-3xl font-bold text-primary">HC</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{companyInfo.founder}</h3>
              <p className="text-primary font-medium mb-4">{t.about.founder}</p>
              <p className="text-muted-foreground leading-relaxed">{t.about.founderBio}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
