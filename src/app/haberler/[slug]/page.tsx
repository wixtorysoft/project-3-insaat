'use client'

import { motion } from 'framer-motion'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar, ArrowLeft, ChevronRight, ArrowRight,
  Newspaper, Building2, Briefcase, Globe,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getNewsBySlug, newsItems } from '@/data/content'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, React.ElementType> = {
  corporate: Building2,
  project: Briefcase,
  sector: Globe,
}

export default function NewsDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale, t } = useI18n()

  const news = getNewsBySlug(slug)
  if (!news) return notFound()

  const categoryLabels: Record<string, string> = {
    corporate: t.corporate.news.corporate,
    project: t.corporate.news.project,
    sector: t.corporate.news.sector,
  }

  const categoryColors: Record<string, string> = {
    corporate: 'bg-primary/90 text-primary-foreground',
    project: 'bg-amber-500/90 text-white',
    sector: 'bg-emerald-500/90 text-white',
  }

  // Related news (same category, different news)
  const relatedNews = newsItems
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 3)

  const Icon = categoryIcons[news.category] || Newspaper

  const title = locale === 'en' ? news.titleEn : news.title
  const content = locale === 'en' ? news.contentEn : news.content

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Background with Breadcrumb */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={news.image} alt="" className="w-full h-full object-cover" />
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
            <Link href="/haberler" className="hover:text-primary transition-colors">{t.nav.news}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{title}</span>
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
              src={news.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-1.5 ${categoryColors[news.category]}`}>
                <Icon className="w-3.5 h-3.5" />
                {categoryLabels[news.category]}
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
                  <Link href="/haberler">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.corporate.news.backToNews}
                  </Link>
                </Button>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="gradient-text">{title}</span>
                </h1>

                {/* Date */}
                <div className="flex items-center gap-2 text-muted-foreground mb-8">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {new Date(news.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Full Content */}
                <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                  {content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed text-base mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
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
                {/* News Info Card */}
                <div className="glass card-hover rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t.corporate.news.category}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.corporate.news.publishedOn}</span>
                      <span className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(news.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{t.corporate.news.category}</span>
                      <span className={`text-sm font-medium flex items-center gap-1.5 ${categoryColors[news.category]} px-2.5 py-1 rounded-full`}>
                        <Icon className="w-3 h-3" />
                        {categoryLabels[news.category]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="glass card-hover rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t.corporate.news.interestedTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.corporate.news.interestedDesc}
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

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border/50">
              <h2 className="text-2xl font-bold mb-8">
                <span className="text-foreground">{locale === 'en' ? 'Related ' : 'İlgili '}</span>
                <span className="gradient-text">{locale === 'en' ? 'News' : 'Haberler'}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNews.map((relNews) => {
                  const RelIcon = categoryIcons[relNews.category] || Newspaper
                  return (
                    <motion.div
                      key={relNews.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="group"
                    >
                      <Link href={`/haberler/${relNews.slug}`}>
                        <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden">
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={relNews.image}
                              alt={locale === 'en' ? relNews.titleEn : relNews.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            <div className="absolute top-3 left-3">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${categoryColors[relNews.category]}`}>
                                <RelIcon className="w-3 h-3" />
                                {categoryLabels[relNews.category]}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                              <Calendar className="w-3 h-3 text-primary" />
                              <span>{new Date(relNews.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                              {locale === 'en' ? relNews.titleEn : relNews.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
