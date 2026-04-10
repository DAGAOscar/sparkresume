/**
 * Site Configuration
 * Centralized configuration for the SparkResume application
 */

export const siteConfig = {
  name: 'SparkResume',
  description: 'Create professional CVs with beautiful templates',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://sparkresume.work',
  domain: 'sparkresume.work',
  email: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@sparkresume.work',
    contact: 'support@sparkresume.work'
  },
  social: {
    twitter: 'https://twitter.com/sparkresume',
    github: 'https://github.com/sparkresume',
    linkedin: 'https://linkedin.com/company/sparkresume'
  },
  links: {
    privacy: '/privacy',
    terms: '/terms',
    contact: '/contact',
    upgrade: '/upgrade',
    dashboard: '/dashboard',
    builder: '/builder'
  },
  features: {
    pdfDownloads: {
      free: 2,
      premium: Infinity
    },
    pricing: {
      monthly: 1.00,
      yearly: 10.00,
      yearlyDiscount: '17%' // (10 vs 12 if paying monthly)
    }
  }
}

export type SiteConfig = typeof siteConfig
