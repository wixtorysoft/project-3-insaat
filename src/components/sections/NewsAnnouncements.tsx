'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight, Newspaper, Megaphone } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { newsItems, announcementItems } from '@/data/content'

export default function NewsAnnouncements() {
  const { locale, t } = useI18n()
  const latestNews = newsItems.slice(0, 3)
  const latestAnnouncements = announcementItems.slice(0, 3)

  const announcementCategoryColors: Record<string, string> = {
    general: 'bg-primary/90 text-primary-foreground',
    tender: 'bg-blue-500/90 text-white',
    event: 'bg-emerald-500/90 text-white',
    career: 'bg-purple-500/90 text-white',
  }

  const announcementCategoryLabels: Record<string, string> = {
    general: t.corporate.announcements.general,
    tender: t.corporate.announcements.tender,
    event: t.corporate.announcements.event,
    career: t.corporate.announcements.career,
  }

  const newsCategoryLabels: Record<string, string> = {
    corporate: t.corporate.news.corporate,
    project: t.corporate.news.project,
    sector: t.corporate.news.sector,
  }

  const newsCategoryColors: Record<string, string> = {
    corporate: 'bg-primary/90 text-primary-foreground',
    project: 'bg-amber-500/90 text-white',
    sector: 'bg-emerald-500/90 text-white',
  }

  return (
    <section id="news" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ========== HABERLER BÖLÜMÜ ========== */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Newspaper className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.corporate.news.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-foreground">{t.corporate.news.title1} </span>
              <span className="gradient-text">{t.corporate.news.title2}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.corporate.news.description}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestNews.map((news, i) => (
              <motion.div key={news.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group">
                <Link href={`/haberler/${news.slug}`}>
                  <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={news.image} alt={locale === 'en' ? news.titleEn : news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${newsCategoryColors[news.category]}`}>
                          {newsCategoryLabels[news.category]}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{new Date(news.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{locale === 'en' ? news.titleEn : news.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{locale === 'en' ? news.summaryEn : news.summary}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/haberler" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold hover:bg-primary/20 transition-all">
              {t.corporate.announcements.viewAllNews}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ========== DUYURULAR BÖLÜMÜ ========== */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">{t.corporate.announcements.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-foreground">{t.corporate.announcements.title1} </span>
              <span className="gradient-text">{t.corporate.announcements.title2}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.corporate.announcements.description}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestAnnouncements.map((ann, i) => (
              <motion.div key={ann.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group">
                <Link href={`/duyurular/${ann.slug}`}>
                  <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={ann.image} alt={locale === 'en' ? ann.titleEn : ann.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${announcementCategoryColors[ann.category]}`}>
                          {announcementCategoryLabels[ann.category]}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{new Date(ann.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">{locale === 'en' ? ann.titleEn : ann.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{locale === 'en' ? ann.summaryEn : ann.summary}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/duyurular" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold hover:bg-amber-500/20 transition-all">
              {t.corporate.announcements.viewAll}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
