'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, HardHat, Phone, ChevronDown, Building2, Clock,
  Users, Target, History, ShieldCheck, Newspaper, Megaphone,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSiteStore } from '@/lib/store'
import { useI18n } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

type OpenMenu = 'none' | 'corporate' | 'projects'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<OpenMenu>('none')
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSiteStore()
  const { t, locale } = useI18n()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (openMenu === 'none') return
    const handleClick = () => setOpenMenu('none')
    const id = requestAnimationFrame(() => {
      document.addEventListener('click', handleClick)
    })
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('click', handleClick)
    }
  }, [openMenu])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu('none')
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  const toggleMenu = useCallback((menu: OpenMenu) => {
    setOpenMenu(prev => prev === menu ? 'none' : menu)
  }, [])

  const handleNavClick = () => {
    closeMobileMenu()
    setOpenMenu('none')
  }

  const corporateItems = [
    { href: '/hakkimizda', label: t.nav.about, icon: Users, desc: locale === 'en' ? 'Company overview' : 'Şirket genel bakış', color: 'primary' as const },
    { href: '/vizyon-misyon', label: t.nav.visionMission, icon: Target, desc: locale === 'en' ? 'Our goals & principles' : 'Hedeflerimiz & ilkelerimiz', color: 'primary' as const },
    { href: '/tarihce', label: t.nav.history, icon: History, desc: locale === 'en' ? 'Our journey since 1999' : '1999\'dan bugüne yolculuğumuz', color: 'primary' as const },
    { href: '/kalite-politikasi', label: t.nav.qualityPolicy, icon: ShieldCheck, desc: locale === 'en' ? 'Standards & certifications' : 'Standartlar & sertifikalar', color: 'primary' as const },
    { href: '/haberler', label: t.nav.news, icon: Newspaper, desc: locale === 'en' ? 'Latest news & updates' : 'Güncel haberler & gelişmeler', color: 'primary' as const },
    { href: '/duyurular', label: t.nav.announcements, icon: Megaphone, desc: locale === 'en' ? 'Tenders, events & notices' : 'İhaleler, etkinlikler & duyurular', color: 'amber' as const },
  ]

  const projectItems = [
    { href: '/projeler', label: t.nav.completedProjects, icon: Building2, desc: locale === 'en' ? 'Successfully delivered' : 'Başarıyla teslim edildi', color: 'primary' as const },
    { href: '/devam-eden-projeler', label: t.nav.ongoingProjects, icon: Clock, desc: locale === 'en' ? 'Currently under construction' : 'Şu anda inşaat halinde', color: 'amber' as const },
  ]

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/hizmetler', label: t.nav.services },
  ]

  const otherLinks = [
    { href: '/sss', label: t.nav.faq },
    { href: '/kariyer', label: t.nav.career },
    { href: '/iletisim', label: t.nav.contact },
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
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <HardHat className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight gradient-text">WIXTORY</span>
              <span className="text-[10px] sm:text-xs text-white/70 -mt-1 tracking-widest">İNŞAAT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenu('none')}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}

            {/* Kurumsal Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); toggleMenu('corporate') }}
                className={`nav-link with-chevron ${openMenu === 'corporate' ? 'active' : ''}`}
              >
                {t.nav.corporate}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === 'corporate' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openMenu === 'corporate' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="dropdown-panel w-72"
                  >
                    <div className="p-1.5">
                      {corporateItems.map((item) => {
                        const Icon = item.icon
                        const isAmber = item.color === 'amber'
                        return (
                          <Link key={item.href} href={item.href} onClick={() => setOpenMenu('none')} className="dropdown-item group/item">
                            <div className={`dropdown-icon ${isAmber ? 'amber' : ''}`}>
                              <Icon className={`w-5 h-5 ${isAmber ? 'text-amber-400' : 'text-primary'}`} />
                            </div>
                            <div>
                              <span className={`dropdown-item-title ${isAmber ? 'amber' : ''}`}>{item.label}</span>
                              <p className="dropdown-item-desc">{item.desc}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projeler Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); toggleMenu('projects') }}
                className={`nav-link with-chevron ${openMenu === 'projects' ? 'active' : ''}`}
              >
                {t.nav.projects}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === 'projects' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openMenu === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="dropdown-panel w-64"
                  >
                    <div className="p-1.5">
                      {projectItems.map((item) => {
                        const Icon = item.icon
                        const isAmber = item.color === 'amber'
                        return (
                          <Link key={item.href} href={item.href} onClick={() => setOpenMenu('none')} className="dropdown-item group/item">
                            <div className={`dropdown-icon ${isAmber ? 'amber' : ''}`}>
                              <Icon className={`w-5 h-5 ${isAmber ? 'text-amber-400' : 'text-primary'}`} />
                            </div>
                            <div>
                              <span className={`dropdown-item-title ${isAmber ? 'amber' : ''}`}>{item.label}</span>
                              <p className="dropdown-item-desc">{item.desc}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Diğer Linkler */}
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenu('none')}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sağ Taraf */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+905448358401" className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+90 544 835 84 01</span>
            </a>
            <LanguageSwitcher />
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              <Link href="/iletisim">{t.nav.getOffer}</Link>
            </Button>
          </div>

          {/* Mobil Menü Butonu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={handleNavClick} className="mobile-link">
                  {link.label}
                </Link>
              ))}

              <div className="px-4 py-2">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{t.nav.corporate}</p>
                {corporateItems.map((item) => {
                  const Icon = item.icon
                  const isAmber = item.color === 'amber'
                  return (
                    <Link key={item.href} href={item.href} onClick={handleNavClick} className="mobile-dropdown-item group/mob">
                      <Icon className={`w-4 h-4 ${isAmber ? 'text-amber-400' : 'text-primary'}`} />
                      <span className={`mobile-dropdown-item-title ${isAmber ? 'amber' : ''}`}>{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="px-4 py-2">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{t.nav.projects}</p>
                {projectItems.map((item) => {
                  const Icon = item.icon
                  const isAmber = item.color === 'amber'
                  return (
                    <Link key={item.href} href={item.href} onClick={handleNavClick} className="mobile-dropdown-item group/mob">
                      <Icon className={`w-4 h-4 ${isAmber ? 'text-amber-400' : 'text-primary'}`} />
                      <span className={`mobile-dropdown-item-title ${isAmber ? 'amber' : ''}`}>{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {otherLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={handleNavClick} className="mobile-link">
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10">
                <a href="tel:+905448358401" className="flex items-center gap-2 px-4 py-3 text-sm text-white/70">
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
