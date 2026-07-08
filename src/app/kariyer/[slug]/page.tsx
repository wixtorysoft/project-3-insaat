'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Calendar, ArrowLeft, ChevronRight, ArrowRight,
  Briefcase, Clock, DollarSign, CheckCircle2, Upload, X, Send,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { getJobBySlug, getActiveJobs } from '@/data/content'
import { IMAGES } from '@/data/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const departmentColors: Record<string, string> = {
  engineering: 'bg-blue-500/90 text-white',
  architecture: 'bg-purple-500/90 text-white',
  management: 'bg-amber-500/90 text-white',
  safety: 'bg-emerald-500/90 text-white',
  finance: 'bg-rose-500/90 text-white',
  it: 'bg-cyan-500/90 text-white',
}

export default function JobDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { locale, t } = useI18n()

  // Form state (must be before any conditional return)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', coverLetter: '' })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const job = getJobBySlug(slug)
  if (!job) return notFound()

  const relatedJobs = getActiveJobs().filter(j => j.department === job.department && j.id !== job.id).slice(0, 3)

  const title = locale === 'en' ? job.titleEn : job.title
  const description = locale === 'en' ? job.descriptionEn : job.description
  const requirements = locale === 'en' ? job.requirementsEn : job.requirements
  const benefits = locale === 'en' ? job.benefitsEn : job.benefits

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 5 * 1024 * 1024) {
      setCvFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.size <= 5 * 1024 * 1024) {
      setCvFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cvFile) return
    setIsSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('coverLetter', formData.coverLetter)
      fd.append('jobSlug', job.slug)
      fd.append('jobTitle', title)
      fd.append('cv', cvFile)
      const res = await fetch('/api/career', { method: 'POST', body: fd })
      if (res.ok) setSubmitted(true)
    } catch { /* ignore */ }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
        {/* Hero Background with Breadcrumb */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.bgCorporate} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/kariyer" className="hover:text-primary transition-colors">{t.nav.career}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground line-clamp-1">{title}</span>
            </motion.nav>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
                    <Link href="/kariyer"><ArrowLeft className="w-4 h-4 mr-2" />{t.career.backToJobs}</Link>
                  </Button>

                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${departmentColors[job.department]}`}>
                      {locale === 'en' ? job.departmentLabelEn : job.departmentLabel}
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">
                      {locale === 'en' ? job.typeLabelEn : job.typeLabel}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold mb-6">
                    <span className="gradient-text">{title}</span>
                  </h1>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {locale === 'en' ? job.locationEn : job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {locale === 'en' ? job.experienceEn : job.experience}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {locale === 'en' ? job.salaryEn : job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(job.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t.career.jobDetail}</h2>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                  </div>

                  {/* Requirements */}
                  <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t.career.requirements}</h2>
                    <div className="space-y-3">
                      {requirements.map((req, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 group cursor-default">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{req}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="glass card-hover rounded-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t.career.benefits}</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="sticky top-24 space-y-6">
                  {/* Job Info Card */}
                  <div className="glass card-hover rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t.career.jobDetail}</h3>
                    <div className="space-y-4">
                      {[
                        { label: t.career.department, value: locale === 'en' ? job.departmentLabelEn : job.departmentLabel },
                        { label: t.career.location, value: locale === 'en' ? job.locationEn : job.location },
                        { label: t.career.type, value: locale === 'en' ? job.typeLabelEn : job.typeLabel },
                        { label: t.career.experience, value: locale === 'en' ? job.experienceEn : job.experience },
                        { label: t.career.salary, value: locale === 'en' ? job.salaryEn : job.salary },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className="text-sm font-medium text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <div className="glass card-hover rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{t.career.applyForJob}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t.career.uploadCvDesc}</p>
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}>
                      <span>{t.career.applyForJob}<ArrowRight className="w-4 h-4 ml-2" /></span>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Application Form */}
            <div id="apply-form" className="mt-16 pt-12 border-t border-border/50">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="gradient-text">{t.career.applyForJob}</span>
                </h2>
                <p className="text-muted-foreground mb-8">{title}</p>

                {submitted ? (
                  <div className="glass rounded-2xl p-8 sm:p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{t.career.successTitle}</h3>
                    <p className="text-muted-foreground">{t.career.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{t.career.fullName} *</label>
                        <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-secondary/50 border-border/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{t.career.email} *</label>
                        <Input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-secondary/50 border-border/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.career.phone} *</label>
                      <Input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="bg-secondary/50 border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.career.coverLetter}</label>
                      <Textarea value={formData.coverLetter} onChange={e => setFormData({ ...formData, coverLetter: e.target.value })} placeholder={t.career.coverLetterPlaceholder} rows={4} className="bg-secondary/50 border-border/50 resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.career.cvFile} *</label>
                      <div
                        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'}`}
                      >
                        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                        {cvFile ? (
                          <div className="flex items-center justify-center gap-3">
                            <Upload className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-foreground">{cvFile.name}</span>
                            <button type="button" onClick={e => { e.stopPropagation(); setCvFile(null) }} className="p-1 hover:bg-destructive/10 rounded"><X className="w-4 h-4 text-destructive" /></button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">{t.career.dragDrop}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t.career.supportedFormats}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting || !cvFile} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />{t.career.submitting}</span>
                      ) : (
                        <span className="flex items-center gap-2"><Send className="w-4 h-4" />{t.career.submit}</span>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border/50">
                <h2 className="text-2xl font-bold mb-8">
                  <span className="text-foreground">{locale === 'en' ? 'Related ' : 'Benzer '}</span>
                  <span className="gradient-text">{locale === 'en' ? 'Positions' : 'Pozisyonlar'}</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedJobs.map(relJob => (
                    <motion.div key={relJob.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                      <Link href={`/kariyer/${relJob.slug}`}>
                        <div className="glass card-hover rounded-2xl p-5">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full inline-block mb-3 ${departmentColors[relJob.department]}`}>
                            {locale === 'en' ? relJob.departmentLabelEn : relJob.departmentLabel}
                          </span>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{locale === 'en' ? relJob.titleEn : relJob.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{locale === 'en' ? relJob.locationEn : relJob.location}</span>
                            <span>{locale === 'en' ? relJob.experienceEn : relJob.experience}</span>
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
