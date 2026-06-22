'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Target, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import { IMAGES } from '@/data/images'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <img
                src={IMAGES.aboutTeam}
                alt="Wixtory Team"
                className="relative rounded-2xl w-full object-cover shadow-2xl"
              />
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 glass card-hover rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl font-bold gradient-text">25+</span>
                  <p className="text-sm text-muted-foreground mt-1">{t.about.yearsExperience}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{t.about.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-foreground">{t.about.title1} </span>
              <span className="gradient-text">{t.about.title2}</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              {t.about.description}
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="glass card-hover border-gradient-hover rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary icon-hover" />
                  <h4 className="font-semibold text-foreground">{t.about.mission}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.about.missionText}
                </p>
              </div>
              <div className="glass card-hover border-gradient-hover rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-primary icon-hover" />
                  <h4 className="font-semibold text-foreground">{t.about.vision}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.about.visionText}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {t.about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 group/feature cursor-default">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300" />
                  <span className="text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link href="/iletisim">{t.about.contactUs}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
