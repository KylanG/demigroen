'use client'

import { useState } from 'react'
import { getLang } from '@/lib/i18n'
import type { FaqSection as FaqSectionType, FaqItem } from '@/types/sections'

export default function FaqSection({ section }: { section: FaqSectionType }) {
  const heading = getLang(section.heading)
  const items = section.items ?? []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-section bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-body text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((item: FaqItem, i: number) => (
            <div key={item._key} className="border border-border rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-body hover:bg-background transition-base"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{getLang(item.question)}</span>
                <svg
                  className={`w-5 h-5 text-muted transition-base shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-muted leading-relaxed">
                  {getLang(item.answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
