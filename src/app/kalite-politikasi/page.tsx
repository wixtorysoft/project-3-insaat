'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Award, FileCheck, Leaf, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { IMAGES } from '@/data/images'

const certIcons = [ShieldCheck, Leaf, ShieldCheck, Award, Leaf]

export default function QualityPolicyPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
  <img src={IMAGES.bgCorporate} alt="Kalite Politikası" className="w-full h-full object-cover" />
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
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.corporate.qualityPolicy.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.qualityPolicy.title1} </span>
              <span className="gradient-text">{t.corporate.qualityPolicy.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.corporate.qualityPolicy.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Policy Text */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass card-hover rounded-2xl p-8 sm:p-10 mb-12">
              <h2 className="text-2xl font-bold gradient-text mb-6">{t.corporate.qualityPolicy.policyTitle}</h2>
              <p className="text-muted-foreground leading-relaxed text-base mb-4">
                {t.corporate.qualityPolicy.policyText1}
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                {t.corporate.qualityPolicy.policyText2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-8">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
              {t.corporate.qualityPolicy.certificationsTitle}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.corporate.qualityPolicy.certifications.map((cert, index) => {
              const Icon = certIcons[index] || ShieldCheck
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="glass card-hover-lift shine-effect rounded-2xl p-6 h-full group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary icon-hover" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{cert.title}</h3>
                    <p className="text-sm font-medium text-primary mb-3">{cert.desc}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Principles */}
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
              {t.corporate.qualityPolicy.principlesTitle}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.corporate.qualityPolicy.principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 glass card-hover rounded-xl p-5 group/princ cursor-default"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover/princ:scale-125 transition-transform duration-300" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm group-hover/princ:text-primary transition-colors duration-300">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
