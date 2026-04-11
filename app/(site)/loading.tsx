export default function SiteLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-background py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="h-12 bg-border rounded-sm w-3/4" />
              <div className="h-12 bg-border rounded-sm w-1/2" />
              <div className="h-5 bg-border rounded-sm w-full" />
              <div className="h-5 bg-border rounded-sm w-4/5" />
              <div className="flex gap-3 pt-2">
                <div className="h-11 w-36 bg-border rounded-md" />
                <div className="h-11 w-36 bg-border rounded-md" />
              </div>
            </div>
            <div className="aspect-4/3 bg-border rounded-md" />
          </div>
        </div>
      </div>

      {/* Block skeleton */}
      <div className="py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-8 bg-border rounded-sm w-64 mx-auto" />
          <div className="grid sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-border rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
