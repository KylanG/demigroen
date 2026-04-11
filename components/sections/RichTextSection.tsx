import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { RichTextSection as RichTextSectionType } from '@/types/sections'

export default function RichTextSection({ section }: { section: RichTextSectionType }) {
  if (!section.content?.length) return null

  return (
    <section className="py-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortableTextRenderer value={section.content} />
      </div>
    </section>
  )
}
