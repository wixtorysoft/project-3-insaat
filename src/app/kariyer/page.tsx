'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, MapPin, Clock, DollarSign, Building2, ArrowUpRight,
  Upload, FileText, Users, Layers, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { IMAGES } from '@/data/images'
import { getActiveJobs, type JobDepartment, type JobType } from '@/data/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const departmentColors: Record<JobDepartment, { bg: string; text: string; border: string; badge: string }> = {
  engineering: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', badge: 'bg-blue-500/90 text-white' },
  architecture: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', badge: 'bg-purple-500/90 text-white' },
  management: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', badge: 'bg-amber-500/90 text-white' },
  safety: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', badge: 'bg-emerald-500/90 text-white' },
  finance: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', badge: 'bg-rose-500/90 text-white' },
  it: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', badge: 'bg-cyan-500/90 text-white' },
}

const departmentFilters: { key: JobDepartment | 'all'; labelTr: string; labelEn: string }[] = [
  { key: 'all', labelTr: 'Tümü', labelEn: 'All' },
  { key: 'engineering', labelTr: 'Mühendislik', labelEn: 'Engineering' },
  { key: 'architecture', labelTr: 'Mimarlık', labelEn: 'Architecture' },
  { key: 'management', labelTr: 'Proje Yönetimi', labelEn: 'Project Management' },
  { key: 'safety', labelTr: 'İSG', labelEn: 'OHS' },
  { key: 'finance', labelTr: 'Finans', labelEn: 'Finance' },
  { key: 'it', labelTr: 'Bilişim', labelEn: 'IT' },
]

const typeFilters: { key: JobType | 'all'; labelTr: string; labelEn: string }[] = [
  { key: 'all', labelTr: 'Tümü', labelEn: 'All' },
  { key: 'fulltime', labelTr: 'Tam Zamanlı', labelEn: 'Full-time' },
  { key: 'contract', labelTr: 'Sözleşmeli', labelEn: 'Contract' },
]

export default function CareerPage() {
  const { locale, t } = useI18n()
  const [activeDepartment, setActiveDepartment] = useState<JobDepartment | 'all'>('all')
  const [activeType, setActiveType] = useState<JobType | 'all'>('all')
  const [fileName, setFileName] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allJobs = getActiveJobs()

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const deptMatch = activeDepartment === 'all' || job.department === activeDepartment
      const typeMatch = activeType === 'all' || job.type === activeType
      return deptMatch && typeMatch
    })
  }, [allJobs, activeDepartment, activeType])

  const uniqueDepartments = useMemo(() => {
    const depts = new Set(allJobs.map((j) => j.department))
    return depts.size
  }, [allJobs])

  const getLocalizedField = (tr: string, en: string) => (locale === 'en' ? en : tr)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgCorporate} alt="Kariyer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.career.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.career.title1} </span>
              <span className="gradient-text">{t.career.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.career.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">{allJobs.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t.career.openPositions}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">{uniqueDepartments}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t.career.filterDepartment}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">5</span>
                </div>
                <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Cities' : 'Şehir'}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-2xl sm:text-3xl font-bold gradient-text">10K+</span>
                </div>
                <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Employees' : 'Çalışan'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {t.career.filterDepartment}:
              </span>
              <div className="flex flex-wrap gap-2">
                {departmentFilters.map((dept) => {
                  const isActive = activeDepartment === dept.key
                  const deptColor = dept.key !== 'all' ? departmentColors[dept.key] : null
                  return (
                    <Button
                      key={dept.key}
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveDepartment(dept.key)}
                      className={
                        isActive
                          ? deptColor
                            ? `${deptColor.bg} ${deptColor.text} border ${deptColor.border} hover:${deptColor.bg}`
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30'
                      }
                    >
                      {getLocalizedField(dept.labelTr, dept.labelEn)}
                    </Button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {t.career.filterType}:
              </span>
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((type) => {
                  const isActive = activeType === type.key
                  return (
                    <Button
                      key={type.key}
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveType(type.key)}
                      className={
                        isActive
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30'
                      }
                    >
                      {getLocalizedField(type.labelTr, type.labelEn)}
                    </Button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Briefcase className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{t.career.noPositions}</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, index) => {
                  const colors = departmentColors[job.department]
                  return (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="group"
                    >
                      <div className="glass card-hover-glow shine-effect rounded-2xl overflow-hidden h-full flex flex-col">
                        {/* Card Header with department badge */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                              {getLocalizedField(job.departmentLabel, job.departmentLabelEn)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(job.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          {/* Job Title */}
                          <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {getLocalizedField(job.title, job.titleEn)}
                          </h3>

                          {/* Job Details */}
                          <div className="space-y-2 mb-4 flex-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0" />
                              <span>{getLocalizedField(job.location, job.locationEn)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary/70 flex-shrink-0" />
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                                {getLocalizedField(job.typeLabel, job.typeLabelEn)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building2 className="w-4 h-4 text-primary/70 flex-shrink-0" />
                              <span>{getLocalizedField(job.experience, job.experienceEn)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <DollarSign className="w-4 h-4 text-primary/70 flex-shrink-0" />
                              <span>{getLocalizedField(job.salary, job.salaryEn)}</span>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="pt-4 border-t border-border/50">
                            <Link
                              href={`/kariyer/${job.slug}`}
                              className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                            >
                              {t.career.viewDetail}
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* CV Upload Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t.career.uploadCv}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-foreground">{t.career.generalCv}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t.career.generalCvDesc}
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              {/* Drag & Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-border/50 rounded-xl p-8 sm:p-10 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 mb-6"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">{t.career.dragDrop}</p>
                    <p className="text-xs text-muted-foreground">{t.career.supportedFormats}</p>
                  </div>
                  {fileName && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary font-medium">{fileName}</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* General Application Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="cv-name" className="text-sm font-medium text-foreground">
                      {t.career.fullName}
                    </label>
                    <Input
                      id="cv-name"
                      placeholder={locale === 'en' ? 'John Doe' : 'Adınız Soyadınız'}
                      className="bg-secondary/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cv-email" className="text-sm font-medium text-foreground">
                      {t.career.email}
                    </label>
                    <Input
                      id="cv-email"
                      type="email"
                      placeholder={locale === 'en' ? 'john@example.com' : 'ornek@email.com'}
                      className="bg-secondary/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="cv-phone" className="text-sm font-medium text-foreground">
                    {t.career.phone}
                  </label>
                  <Input
                    id="cv-phone"
                    type="tel"
                    placeholder={locale === 'en' ? '+90 5XX XXX XX XX' : '+90 5XX XXX XX XX'}
                    className="bg-secondary/50 border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.career.cvFile}</label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {fileName || t.career.selectFile}
                  </Button>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {t.career.submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
