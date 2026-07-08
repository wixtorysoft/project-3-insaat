'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy, Leaf, Lightbulb, ShieldCheck, Building2, Award, TreePine, Users, Landmark, Cpu,
  Calendar, Building, Filter,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getAwardsByCategory, awardItems, type AwardCategory } from '@/data/content'
import { IMAGES } from '@/data/images'
import { Button } from '@/components/ui/button'

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Building2,
  Award,
  TreePine,
  Users,
  Landmark,
  Cpu,
}

const categoryConfig: { key: AwardCategory | 'all'; icon: React.ElementType }[] = [
  { key: 'all', icon: Trophy },
  { key: 'innovation', icon: Lightbulb },
  { key: 'sustainability', icon: Leaf },
  { key: 'quality', icon: Award },
  { key: 'safety', icon: ShieldCheck },
  { key: 'corporate', icon: Users },
  { key: 'project', icon: Building2 },
]

const categoryColors: Record<string, string> = {
  innovation: 'bg-blue-500/90 text-white',
  sustainability: 'bg-emerald-500/90 text-white',
  quality: 'bg-primary/90 text-primary-foreground',
  safety: 'bg-amber-500/90 text-white',
  corporate: 'bg-purple-500/90 text-white',
  project: 'bg-rose-500/90 text-white',
}

export default function AwardsPage() {
  const { locale, t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<AwardCategory | 'all'>('all')
  const filtered = getAwardsByCategory(activeCategory)

  const categoryLabels: Record<string, string> = {
    all: locale === 'en' ? 'All' : 'Tümü',
    innovation: t.corporate.awards.categoriesList.innovation,
    sustainability: t.corporate.awards.categoriesList.sustainability,
    quality: t.corporate.awards.categoriesList.quality,
    safety: t.corporate.awards.categoriesList.safety,
    corporate: t.corporate.awards.categoriesList.corporate,
    project: t.corporate.awards.categoriesList.project,
  }

  // Stats
  const stats = [
    { value: awardItems.length, suffix: '+', label: t.corporate.awards.totalAwards, desc: t.corporate.awards.totalAwardsDesc, icon: Trophy },
    { value: 25, suffix: '+', label: t.corporate.awards.yearsActive, desc: t.corporate.awards.yearsActiveDesc, icon: Calendar },
    { value: 6, suffix: '', label: t.corporate.awards.categories, desc: t.corporate.awards.categoriesDesc, icon: Filter },
    { value: 50, suffix: '+', label: t.corporate.awards.partners, desc: t.corporate.awards.partnersDesc, icon: Building },
  ]

  // Sort by year descending
  const sortedAwards = [...filtered].sort((a, b) => parseInt(b.year) - parseInt(a.year))

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgCorporate} alt="Ödüller" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">{t.corporate.awards.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
              <span className="text-sm font-medium text-amber-400">{awardItems.length} {locale === 'en' ? 'awards' : 'ödül'}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.awards.title1} </span>
              <span className="gradient-text">{t.corporate.awards.title2}</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">{t.corporate.awards.description}</p>

            {/* Divider accent */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12 bg-amber-500/30" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="h-px w-12 bg-amber-500/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              <span className="text-foreground">{t.corporate.awards.statsTitle}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass card-hover rounded-2xl p-5 sm:p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categoryConfig.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.key
              const count = cat.key === 'all' ? awardItems.length : awardItems.filter(a => a.category === cat.key).length
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

      {/* Awards Timeline Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              <span className="text-foreground">{t.corporate.awards.timelineTitle}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.corporate.awards.timelineDesc}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedAwards.map((award, index) => {
                const Icon = iconMap[award.icon] || Trophy
                return (
                  <motion.div
                    key={award.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                      {/* Header */}
                      <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 to-transparent">
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-amber-400" />
                          </div>
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400">
                            {award.year}
                          </span>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${categoryColors[award.category]}`}>
                          {categoryLabels[award.category]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 pt-0 flex-1 flex flex-col">
                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                          {locale === 'en' ? award.titleEn : award.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-amber-400" />
                          {locale === 'en' ? award.organizationEn : award.organization}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                          {locale === 'en' ? award.descriptionEn : award.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {sortedAwards.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">{locale === 'en' ? 'No awards found in this category.' : 'Bu kategoride ödül bulunamadı.'}</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
