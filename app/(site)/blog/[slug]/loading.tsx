export default function PostLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-pulse">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-3 w-12 bg-border rounded-sm" />
        <div className="h-3 w-3 bg-border rounded-sm" />
        <div className="h-3 w-10 bg-border rounded-sm" />
        <div className="h-3 w-3 bg-border rounded-sm" />
        <div className="h-3 w-40 bg-border rounded-sm" />
      </div>

      {/* Header */}
      <div className="mb-10 space-y-4">
        <div className="h-4 bg-border rounded-sm w-32" />
        <div className="space-y-3">
          <div className="h-10 bg-border rounded-sm w-full" />
          <div className="h-10 bg-border rounded-sm w-4/5" />
        </div>
        <div className="h-5 bg-border rounded-sm w-full" />
        <div className="h-5 bg-border rounded-sm w-3/4" />
        <div className="flex items-center gap-3 pt-2">
          <div className="w-10 h-10 rounded-full bg-border" />
          <div className="h-4 bg-border rounded-sm w-32" />
        </div>
      </div>

      {/* Cover image */}
      <div className="aspect-video rounded-md bg-border mb-10" />

      {/* Body tekst */}
      <div className="space-y-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-border rounded-sm ${
              i % 5 === 4 ? 'w-2/3' : i % 3 === 2 ? 'w-5/6' : 'w-full'
            }`}
          />
        ))}
        <div className="h-8 bg-border rounded-sm w-48 mt-8" />
        {[...Array(6)].map((_, i) => (
          <div
            key={`b-${i}`}
            className={`h-4 bg-border rounded-sm ${i % 4 === 3 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}
