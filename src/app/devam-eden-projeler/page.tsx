'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight, Clock, Building2, Home, Landmark } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { getOngoingProjects } from '@/data/content'

export default function OngoingProjectsPage() {
  const { locale, t } = useI18n()
  const ongoingProjects = getOngoingProjects()

  const categoryLabels: Record<string, string> = {
    residential: t.projects.residential,
    commercial: t.projects.commercial,
    infrastructure: t.projects.infrastructure,
  }

  const categoryIcons: Record<string, React.ElementType> = {
    residential: Home,
    commercial: Building2,
    infrastructure: Landmark,
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/bg-projects.png" alt="Devam Eden Projeler" className="w-full h-full object-cover" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500">{t.nav.ongoingProjects}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.projects.ongoingTitle} </span>
              <span className="gradient-text">{t.projects.ongoingTitle2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.projects.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ongoing Projects Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {ongoingProjects.map((project, index) => {
              const Icon = categoryIcons[project.category] || Building2
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/devam-eden-projeler/${project.slug}`}>
                    <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-56 sm:h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={locale === 'en' ? project.titleEn : project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-amber-500/90 text-white rounded-full flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {t.projects.ongoing}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full flex items-center gap-1.5">
                            <Icon className="w-3 h-3 text-primary" />
                            {categoryLabels[project.category]}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {locale === 'en' ? project.titleEn : project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {locale === 'en' ? project.descriptionEn : project.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">{t.projects.progress}</span>
                            <span className="font-semibold text-amber-500">%{project.progress}</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${project.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.3 }}
                              className="bg-gradient-to-r from-amber-500 to-primary rounded-full h-2.5"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            <span>{locale === 'en' ? project.locationEn : project.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span>{project.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
