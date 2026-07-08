'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, HardHat, Phone, ChevronDown, Building2, Clock,
  Users, Eye, Target, History, ShieldCheck, Newspaper, Megaphone, Trophy,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSiteStore } from '@/lib/store'
import { useI18n } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [corporateOpen, setCorporateOpen] = useState(false)
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSiteStore()
  const { t, locale } = useI18n()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = () => {
      setProjectsOpen(false)
      setCorporateOpen(false)
    }
    if (projectsOpen || corporateOpen) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [projectsOpen, corporateOpen])

  const handleNavClick = () => {
    closeMobileMenu()
    setProjectsOpen(false)
    setCorporateOpen(false)
  }

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/hizmetler', label: t.nav.services },
  ]

  // Kurumsal dropdown items
  const corporateItems = [
    { href: '/hakkimizda', label: t.nav.about, icon: Users, desc: locale === 'en' ? 'Company overview' : 'Şirket genel bakış', color: 'primary' },
    { href: '/vizyon-misyon', label: t.nav.visionMission, icon: Target, desc: locale === 'en' ? 'Our goals & principles' : 'Hedeflerimiz & ilkelerimiz', color: 'primary' },
    { href: '/tarihce', label: t.nav.history, icon: History, desc: locale === 'en' ? 'Our journey since 1999' : '1999\'dan bugüne yolculuğumuz', color: 'primary' },
    { href: '/kalite-politikasi', label: t.nav.qualityPolicy, icon: ShieldCheck, desc: locale === 'en' ? 'Standards & certifications' : 'Standartlar & sertifikalar', color: 'primary' },
    { href: '/haberler', label: t.nav.news, icon: Newspaper, desc: locale === 'en' ? 'Latest updates' : 'Son güncellemeler', color: 'primary' },
    { href: '/duyurular', label: t.nav.announcements, icon: Megaphone, desc: locale === 'en' ? 'Tenders & events' : 'İhaleler & etkinlikler', color: 'amber' },
    { href: '/oduller', label: t.nav.awards, icon: Trophy, desc: locale === 'en' ? 'Awards & achievements' : 'Ödüller & başarılar', color: 'amber' },
  ]

  // Projects dropdown items
  const projectItems = [
    { href: '/projeler', label: t.nav.completedProjects, icon: Building2, desc: locale === 'en' ? 'Successfully delivered' : 'Başarıyla teslim edildi', color: 'primary' },
    { href: '/devam-eden-projeler', label: t.nav.ongoingProjects, icon: Clock, desc: locale === 'en' ? 'Currently under construction' : 'Şu anda inşaat halinde', color: 'amber' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <HardHat className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight gradient-text">WIXTORY</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground -mt-1 tracking-widest">İNŞAAT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/50"
              >
                {link.label}
              </Link>
            ))}

            {/* Kurumsal Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCorporateOpen(!corporateOpen)
                  setProjectsOpen(false)
                }}
                className="flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/50"
              >
                {t.nav.corporate}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${corporateOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {corporateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 glass rounded-xl shadow-xl shadow-black/20 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      {corporateItems.map((item) => {
                        const Icon = item.icon
                        const isAmber = item.color === 'amber'
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setCorporateOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 transition-all duration-200 group/item"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              isAmber ? 'bg-amber-500/10 group-hover/item:bg-amber-500/20' : 'bg-primary/10 group-hover/item:bg-primary/20'
                            }`}>
                              <Icon className={`w-5 h-5 ${isAmber ? 'text-amber-500' : 'text-primary'}`} />
                            </div>
                            <div>
                              <span className={`text-sm font-semibold text-foreground transition-colors ${
                                isAmber ? 'group-hover/item:text-amber-500' : 'group-hover/item:text-primary'
                              }`}>
                                {item.label}
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setProjectsOpen(!projectsOpen)
                  setCorporateOpen(false)
                }}
                className="flex items-center gap-1 px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/50"
              >
                {t.nav.projects}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${projectsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {projectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 glass rounded-xl shadow-xl shadow-black/20 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      {projectItems.map((item) => {
                        const Icon = item.icon
                        const isAmber = item.color === 'amber'
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setProjectsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 transition-all duration-200 group/item"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              isAmber ? 'bg-amber-500/10 group-hover/item:bg-amber-500/20' : 'bg-primary/10 group-hover/item:bg-primary/20'
                            }`}>
                              <Icon className={`w-5 h-5 ${isAmber ? 'text-amber-500' : 'text-primary'}`} />
                            </div>
                            <div>
                              <span className={`text-sm font-semibold text-foreground transition-colors ${
                                isAmber ? 'group-hover/item:text-amber-500' : 'group-hover/item:text-primary'
                              }`}>
                                {item.label}
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* S.S.S Link */}
            <Link
              href="/sss"
              className="px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/50"
            >
              {t.nav.faq}
            </Link>

            {/* İletişim Link */}
            <Link
              href="/iletisim"
              className="px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent/50"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+905448358401" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+90 544 835 84 01</span>
            </a>
            <LanguageSwitcher />
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <Link href="/iletisim">{t.nav.getOffer}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-border/50"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Kurumsal Section */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {t.nav.corporate}
                </p>
                {corporateItems.map((item) => {
                  const Icon = item.icon
                  const isAmber = item.color === 'amber'
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-all group/mob"
                    >
                      <Icon className={`w-4 h-4 ${isAmber ? 'text-amber-500' : 'text-primary'}`} />
                      <span className={`text-sm font-medium text-muted-foreground transition-colors ${
                        isAmber ? 'group-hover/mob:text-amber-500' : 'group-hover/mob:text-primary'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Projects Section */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {t.nav.projects}
                </p>
                {projectItems.map((item) => {
                  const Icon = item.icon
                  const isAmber = item.color === 'amber'
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-all group/mob"
                    >
                      <Icon className={`w-4 h-4 ${isAmber ? 'text-amber-500' : 'text-primary'}`} />
                      <span className={`text-sm font-medium text-muted-foreground transition-colors ${
                        isAmber ? 'group-hover/mob:text-amber-500' : 'group-hover/mob:text-primary'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile S.S.S Link */}
              <Link
                href="/sss"
                onClick={handleNavClick}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
              >
                {t.nav.faq}
              </Link>

              {/* Mobile İletişim Link */}
              <Link
                href="/iletisim"
                onClick={handleNavClick}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
              >
                {t.nav.contact}
              </Link>

              <div className="pt-3 border-t border-border/50">
                <a href="tel:+905448358401" className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+90 544 835 84 01</span>
                </a>
                <div className="px-4 py-2"><LanguageSwitcher /></div>
                <Button asChild className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  <Link href="/iletisim" onClick={handleNavClick}>{t.nav.getOffer}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
