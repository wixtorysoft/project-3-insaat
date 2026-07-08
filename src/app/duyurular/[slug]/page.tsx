'use client'

import { motion } from 'framer-motion'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, ChevronRight, ArrowRight, Megaphone, FileText, Briefcase, Users } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getAnnouncementBySlug, announcementItems } from '@/data/content'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, React.ElementType> = { general: FileText, tender: Briefcase, event: Users, career: Megaphone }
const categoryColors: Record<string, string> = { general: 'bg-primary/90 text-primary-foreground', tender: 'bg-blue-500/90 text-white', event: 'bg-emerald-500/90 text-white', career: 'bg-purple-500/90 text-white' }

export default function AnnouncementDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale, t } = useI18n()

  const announcement = getAnnouncementBySlug(slug)
  if (!announcement) return notFound()

  const categoryLabels: Record<string, string> = { general: t.corporate.announcements.general, tender: t.corporate.announcements.tender, event: t.corporate.announcements.event, career: t.corporate.announcements.career }
  const related = announcementItems.filter(a => a.category === announcement.category && a.id !== announcement.id).slice(0, 3)
  const Icon = categoryIcons[announcement.category] || Megaphone
  const title = locale === 'en' ? announcement.titleEn : announcement.title
  const content = locale === 'en' ? announcement.contentEn : announcement.content

  return (
    <div className="min-h-screen pt-24 pb-16">
        {/* Breadcrumb Hero */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src={announcement.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/duyurular" className="hover:text-primary transition-colors">{t.nav.announcements}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground line-clamp-1">{title}</span>
            </motion.nav>
          </div>
        </section>

        {/* Image + Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
                    <Link href="/duyurular"><ArrowLeft className="w-4 h-4 mr-2" />{t.corporate.announcements.backToAnnouncements}</Link>
                  </Button>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-1.5 ${categoryColors[announcement.category]}`}><Icon className="w-3.5 h-3.5" />{categoryLabels[announcement.category]}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4"><span className="gradient-text">{title}</span></h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-8"><Calendar className="w-4 h-4 text-amber-400" /><span className="text-sm">{new Date(announcement.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                  <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                    {content.split('\n\n').map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed text-base mb-4 last:mb-0">{p}</p>)}
                  </div>
                </motion.div>
              </div>
              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="sticky top-24 space-y-6">
                  <div className="glass card-hover rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t.corporate.announcements.category}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b border-border/50"><span className="text-sm text-muted-foreground">{t.corporate.announcements.publishedOn}</span><span className="text-sm font-medium text-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" />{new Date(announcement.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                      <div className="flex items-center justify-between py-2"><span className="text-sm text-muted-foreground">{t.corporate.announcements.category}</span><span className={`text-sm font-medium flex items-center gap-1.5 ${categoryColors[announcement.category]} px-2.5 py-1 rounded-full`}><Icon className="w-3 h-3" />{categoryLabels[announcement.category]}</span></div>
                    </div>
                  </div>
                  <div className="glass card-hover rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{locale === 'en' ? 'Interested?' : 'İlgini çekti mi?'}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{locale === 'en' ? 'Contact us for more info.' : 'Detaylı bilgi için iletişime geçin.'}</p>
                    <Button asChild className="w-full bg-amber-500 text-white hover:bg-amber-500/90 font-semibold"><Link href="/iletisim">{t.nav.getOffer}<ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
                  </div>
                </motion.div>
              </div>
            </div>
            {related.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-8"><span className="text-foreground">{locale === 'en' ? 'Related ' : 'İlgili '}</span><span className="gradient-text">{locale === 'en' ? 'Announcements' : 'Duyurular'}</span></h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rel) => { const RI = categoryIcons[rel.category] || Megaphone; return (
                    <motion.div key={rel.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                      <Link href={`/duyurular/${rel.slug}`}><div className="glass card-hover-glow rounded-2xl overflow-hidden"><div className="relative h-40 overflow-hidden"><img src={rel.image} alt={locale === 'en' ? rel.titleEn : rel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" /><div className="absolute top-3 left-3"><span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${categoryColors[rel.category]}`}><RI className="w-3 h-3" />{categoryLabels[rel.category]}</span></div></div><div className="p-4"><div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><Calendar className="w-3 h-3 text-amber-400" /><span>{new Date(rel.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}</span></div><h3 className="font-semibold text-foreground group-hover:text-amber-400 transition-colors line-clamp-2 text-sm">{locale === 'en' ? rel.titleEn : rel.title}</h3></div></div></Link>
                    </motion.div>
                  )})}
                </div>
              </div>
            )}
          </div>
        </section>
    </div>
  )
}
