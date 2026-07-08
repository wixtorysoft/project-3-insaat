'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight, Building2, Home, Landmark, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { getCompletedProjects, getOngoingProjects, type ProjectCategory } from '@/data/content'

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  residential: Home,
  commercial: Building2,
  infrastructure: Landmark,
}

function getCategoryLabel(key: ProjectCategory, t: ReturnType<typeof useI18n>['t']) {
  switch (key) {
    case 'residential': return t.projects.residential
    case 'commercial': return t.projects.commercial
    case 'infrastructure': return t.projects.infrastructure
  }
}

function ProjectCard({
  project,
  locale,
  t,
  href,
  status,
}: {
  project: ReturnType<typeof getCompletedProjects>[0]
  locale: string
  t: ReturnType<typeof useI18n>['t']
  href: string
  status: 'completed' | 'ongoing'
}) {
  const Icon = categoryIcons[project.category] || Building2
  const title = locale === 'en' ? project.titleEn : project.title
  const description = locale === 'en' ? project.descriptionEn : project.description
  const location = locale === 'en' ? project.locationEn : project.location

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={href}>
        <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={project.image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full flex items-center gap-1">
                <Icon className="w-3 h-3" />
                {getCategoryLabel(project.category, t)}
              </span>
            </div>

            {/* Status badge */}
            <div className="absolute top-3 right-3">
              {status === 'completed' ? (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/90 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.projects.completed}
                </span>
              ) : (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/90 text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t.projects.ongoing}
                </span>
              )}
            </div>

            {/* Arrow icon */}
            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {description}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{project.year}</span>
              </div>
            </div>

            {/* Progress bar for ongoing projects */}
            {status === 'ongoing' && typeof project.progress === 'number' && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{t.projects.progress}</span>
                  <span className="font-semibold text-amber-400">%{project.progress}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border/50 flex items-center justify-between group-hover:border-primary/20 transition-colors duration-300">
              <span className="text-xs text-muted-foreground">{t.projects.area}</span>
              <span className="text-sm font-medium text-primary">{project.area}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  const { t, locale } = useI18n()

  const completedProjects = getCompletedProjects().slice(0, 3)
  const ongoingProjects = getOngoingProjects().slice(0, 3)

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

        {/* ══════ Completed Projects ══════ */}
        <div className="mb-16">
          {/* Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  <span className="text-foreground">{t.projects.completedTitle} </span>
                  <span className="gradient-text">{t.projects.completedTitle2}</span>
                </h3>
              </div>
            </div>
            <Button asChild variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-semibold">
              <Link href="/projeler">
                {t.projects.viewDetails}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                t={t}
                href={`/projeler/${project.slug}`}
                status="completed"
              />
            ))}
          </div>
        </div>

        {/* ══════ Ongoing Projects ══════ */}
        <div>
          {/* Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  <span className="text-foreground">{t.projects.ongoingTitle} </span>
                  <span className="gradient-text">{t.projects.ongoingTitle2}</span>
                </h3>
              </div>
            </div>
            <Button asChild variant="ghost" className="text-amber-400 hover:text-amber-400 hover:bg-amber-500/5 font-semibold">
              <Link href="/devam-eden-projeler">
                {t.projects.viewDetails}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                t={t}
                href={`/devam-eden-projeler/${project.slug}`}
                status="ongoing"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
