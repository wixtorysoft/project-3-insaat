'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight, Building2, Home, Landmark, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { getCompletedProjects, type ProjectCategory } from '@/data/content'

const categoryIcons: Record<ProjectCategory | 'all', React.ElementType> = {
  all: Building2,
  residential: Home,
  commercial: Building2,
  infrastructure: Landmark,
}

const categoryKeys: (ProjectCategory | 'all')[] = ['all', 'residential', 'commercial', 'infrastructure']

export default function Projects() {
  const { t, locale } = useI18n()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')

  const completedProjects = getCompletedProjects()

  const filteredProjects = activeCategory === 'all'
    ? completedProjects
    : completedProjects.filter((p) => p.category === activeCategory)

  const getCategoryLabel = (key: ProjectCategory | 'all') => {
    switch (key) {
      case 'all': return t.projects.all
      case 'residential': return t.projects.residential
      case 'commercial': return t.projects.commercial
      case 'infrastructure': return t.projects.infrastructure
    }
  }

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">{t.projects.title1} </span>
            <span className="gradient-text">{t.projects.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            <Link href="/projeler">
              <Building2 className="w-4 h-4 mr-2" />
              {t.nav.completedProjects}
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10 font-semibold">
            <Link href="/devam-eden-projeler">
              <Clock className="w-4 h-4 mr-2" />
              {t.nav.ongoingProjects}
            </Link>
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categoryKeys.map((key) => {
            const Icon = categoryIcons[key]
            return (
              <Button
                key={key}
                variant={activeCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(key)}
                className={
                  activeCategory === key
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30'
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {getCategoryLabel(key)}
              </Button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Link href={`/projeler/${project.slug}`}>
                  <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={locale === 'en' ? project.titleEn : project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                          {getCategoryLabel(project.category)}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/80 text-white">
                          {t.projects.completed}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {locale === 'en' ? project.titleEn : project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {locale === 'en' ? project.descriptionEn : project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{locale === 'en' ? project.locationEn : project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between group-hover:border-primary/20 transition-colors duration-300">
                        <span className="text-xs text-muted-foreground">{t.projects.area}</span>
                        <span className="text-sm font-medium text-primary group-hover:text-lg transition-all duration-300">{project.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 font-semibold">
            <Link href="/projeler">
              {t.projects.viewDetails}
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
