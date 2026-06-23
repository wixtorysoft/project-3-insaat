'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight, Building2, Home, Landmark, Filter } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { getCompletedProjects, type ProjectCategory } from '@/data/content'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, React.ElementType> = {
  all: Filter,
  residential: Home,
  commercial: Building2,
  infrastructure: Landmark,
}

export default function CompletedProjectsPage() {
  const { locale, t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all')

  const completedProjects = getCompletedProjects()

  const categories = [
    { key: 'all' as const, label: t.projects.all },
    { key: 'residential' as const, label: t.projects.residential },
    { key: 'commercial' as const, label: t.projects.commercial },
    { key: 'infrastructure' as const, label: t.projects.infrastructure },
  ]

  const filteredProjects = activeCategory === 'all'
    ? completedProjects
    : completedProjects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/bg-projects.png" alt="Projeler" className="w-full h-full object-cover" />
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
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.nav.completedProjects}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.projects.completedTitle} </span>
              <span className="gradient-text">{t.projects.completedTitle2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.projects.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.key] || Filter
              return (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className={
                    activeCategory === cat.key
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30'
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={locale === 'en' ? project.titleEn : project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                            {categories.find(c => c.key === project.category)?.label}
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
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {locale === 'en' ? project.titleEn : project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
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
                          <span className="text-sm font-medium text-primary">{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
