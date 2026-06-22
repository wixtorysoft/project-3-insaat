'use client'

import Link from 'next/link'
import { HardHat, Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { companyInfo } from '@/data/content'

const quickLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'about' as const, href: '/hakkimizda' },
  { key: 'services' as const, href: '/hizmetler' },
  { key: 'projects' as const, href: '/projeler' },
  { key: 'faq' as const, href: '/sss' },
  { key: 'contact' as const, href: '/iletisim' },
]

const legalLinks = [
  { key: 'privacy' as const, href: '/gizlilik-sozlesmesi' },
  { key: 'kvkk' as const, href: '/kvkk' },
  { key: 'cookies' as const, href: '/cerez-politikasi' },
]

export default function Footer() {
  const { t } = useI18n()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-border/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <HardHat className="w-7 h-7 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">{companyInfo.name.split(' ')[0]}</span>
                <span className="text-[10px] text-muted-foreground -mt-1 tracking-widest">
                  {companyInfo.name.split(' ')[1]?.toUpperCase()}
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t.footer.about}
            </p>
            <div className="space-y-3">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {companyInfo.phoneDisplay}
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {companyInfo.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {companyInfo.address}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.ourServices}</h4>
            <ul className="space-y-2">
              {t.services.items.map((service, i) => (
                <li key={i}>
                  <Link
                    href="/hizmetler"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.getOffer}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t.footer.getOfferDesc}
            </p>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link href="/iletisim">{t.footer.contactNow}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {companyInfo.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t.footer[link.key]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center hover:bg-primary/90 transition-all z-40"
        aria-label={t.scrollTop}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}
