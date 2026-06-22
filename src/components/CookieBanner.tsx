'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

const COOKIE_CONSENT_KEY = 'wixtory-cookie-consent'

type ConsentStatus = 'accepted' | 'rejected' | null

export function getCookieConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus
  } catch {
    return null
  }
}

export function setCookieConsent(status: ConsentStatus): void {
  if (typeof window === 'undefined') return
  try {
    if (status) {
      localStorage.setItem(COOKIE_CONSENT_KEY, status)
    } else {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
    }
  } catch {
    // ignore
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const consent = getCookieConsent()
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent('accepted')
    setVisible(false)
  }

  const handleReject = () => {
    setCookieConsent('rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4"
        >
          <div className="max-w-5xl mx-auto glass rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{t.cookie.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t.cookie.description}{' '}
                    <a href="/cerez-politikasi" className="text-primary hover:underline">
                      {t.cookie.learnMore}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="flex-1 sm:flex-none border-border/50 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  {t.cookie.reject}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  {t.cookie.accept}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
