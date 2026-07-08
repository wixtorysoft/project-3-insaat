'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { kvkkTextTR, kvkkTextEN } from '@/data/legal'

export default function KVKKPage() {
  const { locale, t } = useI18n()
  const content = locale === 'en' ? kvkkTextEN : kvkkTextTR

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">🛡️</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">{t.legal.kvkkTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.legal.lastUpdate}: 01.01.2025</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass card-hover rounded-2xl p-6 sm:p-10">
            <div className="prose prose-invert max-w-none">
              {content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">{line.replace('### ', '')}</h3>
                }
                if (line.startsWith('**')) {
                  const match = line.match(/\*\*(.*?)\*\*(.*)/)
                  if (match) {
                    return <p key={index} className="text-muted-foreground mb-2"><strong className="text-foreground">{match[1]}</strong>{match[2]}</p>
                  }
                }
                if (line.startsWith('- ')) {
                  const match = line.match(/- \*\*(.*?)\*\*(.*)/)
                  if (match) {
                    return <p key={index} className="text-muted-foreground ml-4 mb-1"><strong className="text-foreground">{match[1]}</strong>{match[2]}</p>
                  }
                  return <p key={index} className="text-muted-foreground ml-4 mb-1">• {line.replace('- ', '')}</p>
                }
                if (line.trim() === '') return <div key={index} className="h-2" />
                if (/^\d+\./.test(line)) {
                  return <p key={index} className="text-muted-foreground ml-4 mb-2 leading-relaxed">{line}</p>
                }
                return <p key={index} className="text-muted-foreground mb-3 leading-relaxed">{line}</p>
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
