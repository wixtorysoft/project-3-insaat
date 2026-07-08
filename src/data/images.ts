/**
 * Centralized Image Paths
 * Tüm proje resimleri tek bir dosyadan yönetilir.
 * Resim dosyaları /public/images/ altındaki kategori klasörlerinde bulunur.
 *
 * Klasör Yapısı:
 *   /images/backgrounds/  → Sayfa arka planları ve hero görselleri
 *   /images/projects/     → Proje kart ve galeri görselleri
 *   /images/team/         → Ekip ve şirket görselleri
 */

export const IMAGES = {
  // ─── Arka Plan & Hero Resimleri ───────────────────────
  hero: '/images/backgrounds/hero-construction.png',
  bgServices: '/images/backgrounds/bg-services.png',
  bgFaq: '/images/backgrounds/bg-faq.png',
  bgContact: '/images/backgrounds/bg-contact.png',
  bgCorporate: '/images/backgrounds/bg-corporate.png',
  bgProjects: '/images/backgrounds/bg-projects.png',

  // ─── Ekip & Şirket Resimleri ─────────────────────────
  aboutTeam: '/images/team/about-team.png',

  // ─── Proje Resimleri ─────────────────────────────────
  projectResidential: '/images/projects/project-residential.png',
  projectCommercial: '/images/projects/project-commercial.png',
  projectInterior: '/images/projects/project-interior.png',
  projectInfrastructure: '/images/projects/project-infrastructure.png',
} as const

// Tip güvenliği için
export type ImageKey = keyof typeof IMAGES
