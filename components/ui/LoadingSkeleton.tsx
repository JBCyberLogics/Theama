import type { LoadingSkeletonProps } from '@/types/components'

export default function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const SkeletonCard = () => (
    <div className="animate-shimmer rounded-[4px]" style={{ aspectRatio: '2/3', width: '100%' }}>
      <div className="w-full h-full rounded-[4px]" style={{ backgroundColor: 'var(--surface-theater)' }} />
    </div>
  )

  const SkeletonText = () => (
    <div className="space-y-3">
      <div className="animate-shimmer h-[20px] w-[70%] rounded" style={{ backgroundColor: 'var(--surface-theater)' }} />
      <div className="animate-shimmer h-[16px] w-full rounded" style={{ backgroundColor: 'var(--surface-theater)' }} />
      <div className="animate-shimmer h-[16px] w-[85%] rounded" style={{ backgroundColor: 'var(--surface-theater)' }} />
    </div>
  )

  const SkeletonHero = () => (
    <div
      className="animate-shimmer w-full rounded-[4px]"
      style={{
        height: '70dvh',
        minHeight: 'clamp(350px, 70dvh, 500px)',
        maxHeight: '900px',
        backgroundColor: 'var(--surface-theater)',
      }}
    >
      <div className="flex flex-col justify-end h-full p-6 sm:p-12 gap-4">
        <div className="animate-shimmer h-[48px] w-full max-w-[400px] rounded" style={{ backgroundColor: '#2D1010' }} />
        <div className="animate-shimmer h-[20px] w-full max-w-[300px] rounded" style={{ backgroundColor: '#2D1010' }} />
        <div className="flex gap-3 mt-2">
          <div className="animate-shimmer h-[52px] w-[200px] rounded-[2px]" style={{ backgroundColor: '#2D1010' }} />
          <div className="animate-shimmer h-[52px] w-[140px] rounded-[2px]" style={{ backgroundColor: '#2D1010' }} />
        </div>
      </div>
    </div>
  )

  const SkeletonCircle = () => (
    <div className="animate-shimmer rounded-full" style={{ width: '80px', height: '80px', backgroundColor: 'var(--surface-theater)' }} />
  )

  const renderSkeleton = () => {
    switch (type) {
      case 'card': return <SkeletonCard />
      case 'text': return <SkeletonText />
      case 'hero': return <SkeletonHero />
      case 'circle': return <SkeletonCircle />
      default: return <SkeletonCard />
    }
  }

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  )
}
