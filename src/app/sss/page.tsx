'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { faqItems } from '@/data/content'
import { IMAGES } from '@/data/images'
import { useState } from 'react'

export default function FAQPage() {
  const { locale, t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.bgFaq} alt="S.S.S" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">{t.faq.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-foreground">{t.faq.title1} </span>
              <span className="gradient-text">{t.faq.title2}</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t.faq.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const question = locale === 'en' ? item.questionEn : item.question
              const answer = locale === 'en' ? item.answerEn : item.answer

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className={`glass rounded-xl overflow-hidden border-gradient-hover transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-lg shadow-primary/5' : ''}`}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left group/qbtn"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-foreground pr-4 group-hover/qbtn:text-primary transition-colors duration-300">{question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'group-hover/qbtn:scale-110'
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <div className="border-t border-border/50 pt-4">
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
