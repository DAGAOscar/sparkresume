import { Resend } from 'resend'
import { WelcomeEmail } from '@/app/email-templates/WelcomeEmail'
import { SubscriptionConfirmEmail } from '@/app/email-templates/SubscriptionConfirmEmail'
import { DownloadConfirmEmail } from '@/app/email-templates/DownloadConfirmEmail'
import React from 'react'

let resend: Resend | null = null

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export const emailService = {
  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(email: string, name: string) {
    try {
      const result = await getResend().emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Bienvenue à SparkResume ! 🎉',
        react: WelcomeEmail({ name, email }) as React.ReactElement,
        replyTo: 'support@sparkresume.work'
      })
      
      console.log('Welcome email sent:', result)
      return result
    } catch (error) {
      console.error('Error sending welcome email:', error)
      throw error
    }
  },

  /**
   * Send subscription confirmation email
   */
  async sendSubscriptionEmail(
    email: string,
    name: string,
    plan: 'monthly' | 'yearly',
    price: number,
    renewalDate: string
  ) {
    try {
      const result = await getResend().emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirmation de votre abonnement Premium 🎉',
        react: SubscriptionConfirmEmail({ name, plan, price, renewalDate }) as React.ReactElement,
        replyTo: 'support@sparkresume.work'
      })
      
      console.log('Subscription email sent:', result)
      return result
    } catch (error) {
      console.error('Error sending subscription email:', error)
      throw error
    }
  },

  /**
   * Send download confirmation email
   */
  async sendDownloadConfirmEmail(
    email: string,
    name: string,
    downloadCount: number,
    remainingDownloads: number,
    maxFreeDownloads: number = 2
  ) {
    try {
      const result = await getResend().emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Votre CV a été téléchargé ✓',
        react: DownloadConfirmEmail({
          name,
          downloadCount,
          remainingDownloads,
          maxFreeDownloads
        }) as React.ReactElement,
        replyTo: 'support@sparkresume.work'
      })
      
      console.log('Download confirmation email sent:', result)
      return result
    } catch (error) {
      console.error('Error sending download email:', error)
      throw error
    }
  },

  /**
   * Send generic email
   */
  async sendEmail(
    to: string,
    subject: string,
    react: React.ReactElement
  ) {
    try {
      const result = await getResend().emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react,
        replyTo: 'support@sparkresume.work'
      })
      
      console.log('Email sent:', result)
      return result
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
}
