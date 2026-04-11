'use client'

import { useState } from 'react'
import { getLang } from '@/lib/i18n'
import type { ContactSection as ContactSectionType } from '@/types/sections'

export default function ContactSection({ section }: { section: ContactSectionType }) {
  const heading = getLang(section.heading)
  const subheading = getLang(section.subheading)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Vul alle velden in.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Er is iets misgegaan.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Er is een fout opgetreden. Probeer het opnieuw.')
      setStatus('error')
    }
  }

  return (
    <section className="py-section bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          {heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-body">{heading}</h2>
          )}
          {subheading && (
            <p className="text-muted">{subheading}</p>
          )}
        </div>

        {status === 'success' ? (
          <div className="rounded-md bg-green-50 border border-green-200 p-6 text-center text-green-700">
            Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-body mb-1">
                Naam
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-body transition-base"
                placeholder="Jouw naam"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-body mb-1">
                E-mailadres
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-body transition-base"
                placeholder="jouw@email.nl"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-body mb-1">
                Bericht
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-body resize-none transition-base"
                placeholder="Hoe kunnen we je helpen?"
              />
            </div>

            {errorMsg && (
              <p className="text-red-600 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-base disabled:opacity-60"
            >
              {status === 'loading' ? 'Versturen…' : 'Verstuur bericht'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
