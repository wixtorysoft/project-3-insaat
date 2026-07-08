import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '@/data/translations'
import { translations } from '@/data/translations'

interface I18nState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.tr
}

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      locale: 'tr',
      setLocale: (locale) => set({ locale, t: translations[locale] }),
      t: translations.tr,
    }),
    {
      name: 'wixtory-locale',
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.t = translations[state.locale]
          }
        }
      },
    }
  )
)
