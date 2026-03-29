export default function StatsSection({ heading, stats, link }: any) {
  return (
    <section className="w-full py-20 px-8 md:px-16 bg-[#F5EEE7]">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B1A5E] mb-16">
            {heading}
          </h2>
        )}

        {/* Stats grid */}
        {stats?.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 md:divide-x md:divide-[#8B1A5E]/20">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="flex-1 px-8">
                <p className="text-5xl md:text-6xl font-bold text-[#8B1A5E] mb-3">
                  {stat.value}
                </p>
                <p className="text-base text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Link */}
        {link?.label && link?.url && (
          <div className="mt-12">
            <a
              href={link.url}
              className="inline-flex items-center gap-2 text-[#8B1A5E] font-medium underline underline-offset-4 hover:opacity-70 transition"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#8B1A5E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              {link.label}
            </a>
          </div>
        )}

      </div>
    </section>
  )
}
