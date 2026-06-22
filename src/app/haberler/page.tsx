'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Building2, Briefcase, Globe, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { getNewsByCategory, newsItems, type NewsCategory } from '@/data/content'
import { IMAGES } from '@/data/images'
import { Button } from '@/components/ui/button'

const categoryConfig: { key: NewsCategory | 'all'; icon: React.ElementType; color: string }[] = [
  { key: 'all', icon: Newspaper, color: 'primary' },
  { key: 'corporate', icon: Building2, color: 'primary' },
  { key: 'project', icon: Briefcase, color: 'amber' },
  { key: 'sector', icon: Globe, color: 'emerald' },
]

export default function NewsPage() {
  const { locale, t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all')

  const filteredNews = getNewsByCategory(activeCategory)

  const categoryLabels: Record<string, string> = {
    all: t.corporate.news.all,
    corporate: t.corporate.news.corporate,
    project: t.corporate.news.project,
    sector: t.corporate.news.sector,
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgProjects} alt="Haberler" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.corporate.news.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <span className="text-sm font-medium text-primary">{newsItems.length} {locale === 'en' ? 'articles' : 'yazı'}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.corporate.news.title1} </span>
              <span className="gradient-text">{t.corporate.news.title2}</span>
            </h1>

            {/* Description */}
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.corporate.news.description}
            </p>

            {/* Divider accent */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-12 bg-primary/30" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px w-12 bg-primary/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categoryConfig.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.key
              const count = cat.key === 'all' ? newsItems.length : newsItems.filter(n => n.category === cat.key).length
              return (
                <Button
                  key={cat.key}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className={
                    isActive
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30'
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {categoryLabels[cat.key]}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-foreground/20' : 'bg-muted'}`}>
                    {count}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((news, index) => {
                const catConfig = categoryConfig.find(c => c.key === news.category)
                const isAmber = catConfig?.color === 'amber'
                const isEmerald = catConfig?.color === 'emerald'

                return (
                  <motion.div
                    key={news.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <Link href={`/haberler/${news.slug}`}>
                      <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={news.image}
                            alt={locale === 'en' ? news.titleEn : news.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              isAmber ? 'bg-amber-500/90 text-white' :
                              isEmerald ? 'bg-emerald-500/90 text-white' :
                              'bg-primary/90 text-primary-foreground'
                            }`}>
                              {categoryLabels[news.category]}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 sm:p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            <span>{new Date(news.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {locale === 'en' ? news.titleEn : news.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                            {locale === 'en' ? news.summaryEn : news.summary}
                          </p>
                          <div className="mt-4 pt-3 border-t border-border/50">
                            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                              {t.corporate.news.readMore}
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredNews.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Newspaper className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">{locale === 'en' ? 'No news found in this category.' : 'Bu kategoride haber bulunamadı.'}</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
