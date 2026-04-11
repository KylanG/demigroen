export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 animate-pulse">
      {/* Titel */}
      <div className="h-10 bg-border rounded-sm w-32 mb-8" />

      {/* Categorie filter */}
      <div className="flex gap-2 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-border rounded-full" />
        ))}
      </div>

      {/* Post kaarten */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-md border border-border overflow-hidden">
            <div className="aspect-video bg-border" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-border rounded-sm w-24" />
              <div className="h-5 bg-border rounded-sm w-full" />
              <div className="h-4 bg-border rounded-sm w-5/6" />
              <div className="h-4 bg-border rounded-sm w-3/4" />
              <div className="flex items-center gap-2 pt-2">
                <div className="w-6 h-6 rounded-full bg-border" />
                <div className="h-3 bg-border rounded-sm w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
