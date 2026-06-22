'use client'

import { motion } from 'framer-motion'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Calendar, ArrowLeft, Building2, Home, Landmark,
  Clock, CheckCircle2, ArrowRight, ChevronRight,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getProjectBySlug, getCompletedProjects, getOngoingProjects, projects } from '@/data/content'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, React.ElementType> = {
  residential: Home,
  commercial: Building2,
  infrastructure: Landmark,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale, t } = useI18n()

  const project = getProjectBySlug(slug)
  if (!project) return notFound()

  const isOngoing = project.status === 'ongoing'
  const backHref = isOngoing ? '/devam-eden-projeler' : '/projeler'
  const backLabel = isOngoing ? t.nav.ongoingProjects : t.nav.completedProjects

  const categoryLabels: Record<string, string> = {
    residential: t.projects.residential,
    commercial: t.projects.commercial,
    infrastructure: t.projects.infrastructure,
  }

  const statusLabels: Record<string, string> = {
    completed: t.projects.completed,
    ongoing: t.projects.ongoing,
    planned: t.projects.planned,
  }

  // Related projects (same category, different project)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3)

  const Icon = categoryIcons[project.category] || Building2

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Background with Breadcrumb */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={backHref} className="hover:text-primary transition-colors">{backLabel}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{locale === 'en' ? project.titleEn : project.title}</span>
          </motion.nav>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[450px]"
          >
            <img
              src={project.image}
              alt={locale === 'en' ? project.titleEn : project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-1.5 ${
                project.status === 'completed'
                  ? 'bg-green-500/90 text-white'
                  : project.status === 'ongoing'
                  ? 'bg-amber-500/90 text-white'
                  : 'bg-blue-500/90 text-white'
              }`}>
                {project.status === 'ongoing' && <Clock className="w-3.5 h-3.5" />}
                {statusLabels[project.status]}
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 text-sm font-medium bg-primary/90 text-primary-foreground rounded-full flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {categoryLabels[project.category]}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Back Button */}
                <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
                  <Link href={backHref}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.projects.backToProjects}
                  </Link>
                </Button>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="gradient-text">{locale === 'en' ? project.titleEn : project.title}</span>
                </h1>

                {/* Progress Bar for Ongoing */}
                {isOngoing && project.progress !== undefined && (
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t.projects.progress}</span>
                      <span className="font-semibold text-amber-500">%{project.progress}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-gradient-to-r from-amber-500 to-primary rounded-full h-3"
                      />
                    </div>
                  </div>
                )}

                {/* Full Description */}
                <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-4">{t.projects.generalInfo}</h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {locale === 'en' ? project.fullDescriptionEn : project.fullDescription}
                  </p>
                </div>

                {/* Features */}
                {project.features && (
                  <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t.projects.projectFeatures}</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(locale === 'en' ? project.featuresEn : project.features)?.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 group/feat cursor-default"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover/feat:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-muted-foreground group-hover/feat:text-foreground transition-colors duration-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t.projects.gallery}</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {project.gallery.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="relative rounded-xl overflow-hidden h-32 sm:h-48 group/img"
                        >
                          <img
                            src={img}
                            alt={`${locale === 'en' ? project.titleEn : project.title} - ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-primary/0 group-hover/img:bg-primary/10 transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* Project Info Card */}
                <div className="glass card-hover rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t.projects.projectDetails}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.projects.locationLabel}</span>
                      <span className="text-sm font-medium text-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {locale === 'en' ? project.locationEn : project.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.projects.areaLabel}</span>
                      <span className="text-sm font-medium text-foreground">{project.area}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.projects.yearLabel}</span>
                      <span className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {project.year}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.projects.categoryLabel}</span>
                      <span className="text-sm font-medium text-foreground">{categoryLabels[project.category]}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.projects.statusLabel}</span>
                      <span className={`text-sm font-medium ${project.status === 'completed' ? 'text-green-500' : project.status === 'ongoing' ? 'text-amber-500' : 'text-blue-500'}`}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                    {project.client && (
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">{t.projects.client}</span>
                        <span className="text-sm font-medium text-foreground">
                          {locale === 'en' ? project.clientEn : project.client}
                        </span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground">{t.projects.duration}</span>
                        <span className="text-sm font-medium text-foreground">{project.duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="glass card-hover rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {locale === 'en' ? 'Interested in this project?' : 'Bu proje mi ilginizi çekti?'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {locale === 'en' ? 'Contact us for detailed information and pricing.' : 'Detaylı bilgi ve fiyatlandırma için bizimle iletişime geçin.'}
                  </p>
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    <Link href="/iletisim">
                      {t.nav.getOffer}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border/50">
              <h2 className="text-2xl font-bold mb-8">
                <span className="text-foreground">{locale === 'en' ? 'Related ' : 'Benzer '}</span>
                <span className="gradient-text">{locale === 'en' ? 'Projects' : 'Projeler'}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relProject) => (
                  <motion.div
                    key={relProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link href={`${relProject.status === 'ongoing' ? '/devam-eden-projeler' : '/projeler'}/${relProject.slug}`}>
                      <div className="glass card-hover rounded-2xl overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={relProject.image}
                            alt={locale === 'en' ? relProject.titleEn : relProject.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {locale === 'en' ? relProject.titleEn : relProject.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            {locale === 'en' ? relProject.locationEn : relProject.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
