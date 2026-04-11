import Image from 'next/image'
import { getLang } from '@/lib/i18n'
import { urlFor } from '@/sanity/lib/image'
import type { TeamSection as TeamSectionType, TeamMember } from '@/types/sections'

export default function TeamSection({ section }: { section: TeamSectionType }) {
  const heading = getLang(section.heading)
  const subheading = getLang(section.subheading)
  const members = section.members ?? []

  return (
    <section className="py-section bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          {heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-body">{heading}</h2>
          )}
          {subheading && (
            <p className="text-muted text-lg">{subheading}</p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member: TeamMember) => (
            <div key={member._key} className="text-center space-y-3">
              {member.photo && (
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto shadow-md">
                  <Image
                    src={urlFor(member.photo).width(256).height(256).fit('crop').url()}
                    alt={member.photoAlt || member.name || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {member.name && (
                <h3 className="font-semibold text-body">{member.name}</h3>
              )}
              {member.role && (
                <p className="text-primary text-sm font-medium">{getLang(member.role)}</p>
              )}
              {member.bio && (
                <p className="text-muted text-sm leading-relaxed">{getLang(member.bio)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
