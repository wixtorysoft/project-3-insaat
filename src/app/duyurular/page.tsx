'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Megaphone, FileText, Calendar, ArrowUpRight, Briefcase, Users } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { getAnnouncementsByCategory, announcementItems, type AnnouncementCategory } from '@/data/content'
import { IMAGES } from '@/data/images'
import { Button } from '@/components/ui/button'

const categoryConfig: { key: AnnouncementCategory | 'all'; icon: React.ElementType }[] = [
  { key: 'all', icon: Megaphone },
  { key: 'general', icon: FileText },
  { key: 'tender', icon: Briefcase },
  { key: 'event', icon: Users },
  { key: 'career', icon: Calendar },
]

const categoryColors: Record<string, string> = {
  general: 'bg-primary/90 text-primary-foreground',
  tender: 'bg-blue-500/90 text-white',
  event: 'bg-emerald-500/90 text-white',
  career: 'bg-purple-500/90 text-white',
}

export default function AnnouncementsPage() {
  const { locale, t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<AnnouncementCategory | 'all'>('all')
  const filtered = getAnnouncementsByCategory(activeCategory)

  const categoryLabels: Record<string, string> = {
    all: t.corporate.announcements.all,
    general: t.corporate.announcements.general,
    tender: t.corporate.announcements.tender,
    event: t.corporate.announcements.event,
    career: t.corporate.announcements.career,
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgCorporate} alt="Duyurular" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">{t.corporate.announcements.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              <span className="text-sm font-medium text-amber-400">{announcementItems.length} {locale === 'en' ? 'notices' : 'bildirim'}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.announcements.title1} </span>
              <span className="gradient-text">{t.corporate.announcements.title2}</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">{t.corporate.announcements.description}</p>

            {/* Divider accent */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12 bg-amber-500/30" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="h-px w-12 bg-amber-500/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categoryConfig.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.key
              const count = cat.key === 'all' ? announcementItems.length : announcementItems.filter(a => a.category === cat.key).length
              return (
                <Button key={cat.key} variant={isActive ? 'default' : 'outline'} size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className={isActive ? 'bg-amber-500 text-white hover:bg-amber-500/90' : 'border-border/50 text-muted-foreground hover:text-amber-400 hover:border-amber-400/30'}>
                  <Icon className="w-4 h-4 mr-2" />{categoryLabels[cat.key]}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-muted'}`}>
                    {count}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((ann, index) => (
                <motion.div key={ann.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="group">
                  <Link href={`/duyurular/${ann.slug}`}>
                    <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img src={ann.image} alt={locale === 'en' ? ann.titleEn : ann.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[ann.category]}`}>{categoryLabels[ann.category]}</span>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{new Date(ann.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">{locale === 'en' ? ann.titleEn : ann.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{locale === 'en' ? ann.summaryEn : ann.summary}</p>
                        <div className="mt-4 pt-3 border-t border-border/50">
                          <span className="text-sm font-medium text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">{t.corporate.announcements.readMore}<ArrowUpRight className="w-4 h-4" /></span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Megaphone className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">{locale === 'en' ? 'No announcements found in this category.' : 'Bu kategoride duyuru bulunamadı.'}</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
