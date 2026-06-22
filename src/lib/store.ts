import { create } from 'zustand'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface SiteState {
  activeSection: string
  isMobileMenuOpen: boolean
  contactForm: ContactFormData
  isSubmitting: boolean
  submitSuccess: boolean
  submitError: string | null
  setActiveSection: (section: string) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  updateContactForm: (data: Partial<ContactFormData>) => void
  resetContactForm: () => void
  setSubmitting: (value: boolean) => void
  setSubmitSuccess: (value: boolean) => void
  setSubmitError: (error: string | null) => void
}

const initialContactForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export const useSiteStore = create<SiteState>((set) => ({
  activeSection: 'hero',
  isMobileMenuOpen: false,
  contactForm: initialContactForm,
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,

  setActiveSection: (section) => set({ activeSection: section }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  updateContactForm: (data) =>
    set((state) => ({ contactForm: { ...state.contactForm, ...data } })),
  resetContactForm: () => set({ contactForm: initialContactForm }),
  setSubmitting: (value) => set({ isSubmitting: value }),
  setSubmitSuccess: (value) => set({ submitSuccess: value }),
  setSubmitError: (error) => set({ submitError: error }),
}))
