export default function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-8 md:px-16 w-full ${className}`}>
      {children}
    </div>
  )
}
