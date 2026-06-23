'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSiteStore } from '@/lib/store'
import { useI18n } from '@/lib/i18n'
import { companyInfo } from '@/data/content'
import { useToast } from '@/hooks/use-toast'

export default function Contact() {
  const {
    contactForm,
    updateContactForm,
    isSubmitting,
    setSubmitting,
    submitSuccess,
    setSubmitSuccess,
    submitError,
    setSubmitError,
  } = useSiteStore()
  const { toast } = useToast()
  const { t } = useI18n()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      if (!response.ok) {
        throw new Error('Bir hata oluştu')
      }

      setSubmitSuccess(true)
      toast({
        title: t.contact.successTitle,
        description: t.contact.successDesc,
      })
      updateContactForm({ name: '', email: '', phone: '', subject: '', message: '' })

      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch {
      setSubmitError(t.contact.successDesc)
      toast({
        title: t.contact.successTitle,
        description: t.contact.successDesc,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: companyInfo.phoneDisplay,
      href: `tel:${companyInfo.phone}`,
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: companyInfo.address,
      href: '#',
    },
    {
      icon: Clock,
      label: t.contact.workingHours,
      value: t.contact.workingHoursValue,
      href: '#',
    },
  ]

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">{t.contact.title1} </span>
            <span className="gradient-text">{t.contact.title2}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-start gap-4 group p-3 -m-3 rounded-xl hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                  <info.icon className="w-5 h-5 text-primary icon-hover" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{info.label}</h4>
                  <p className="text-foreground text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="glass card-hover rounded-2xl overflow-hidden mt-6">
              <div className="h-48 sm:h-56 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Levent, İstanbul</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t.contact.successTitle}</h3>
                  <p className="text-muted-foreground">{t.contact.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {t.contact.name} {t.contact.required}
                      </label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => updateContactForm({ name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        {t.contact.email} {t.contact.required}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => updateContactForm({ email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        {t.contact.phone}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => updateContactForm({ phone: e.target.value })}
                        placeholder={t.contact.phonePlaceholder}
                        className="bg-secondary/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        {t.contact.subject} {t.contact.required}
                      </label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => updateContactForm({ subject: e.target.value })}
                        placeholder={t.contact.subjectPlaceholder}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      {t.contact.message} {t.contact.required}
                    </label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => updateContactForm({ message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      required
                      rows={5}
                      className="bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-destructive">{submitError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {t.contact.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {t.contact.send}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
