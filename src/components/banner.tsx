import { BannerShapeOuter, BannerShapeInner } from "./banner-shapes"

export default async function Banner() {
  return (
    <div className="relative overflow-clip">
      <div
        style={{
          background: "linear-gradient(to bottom, var(--color-bg-base), var(--color-banner-gradient-end-bg)",
        }}
        className="flex flex-col items-center justify-end w-full"
      >
        <BannerShapeInner />
      </div>
      <div className="absolute translate-y-1 top-0 left-0 bottom-0 right-0 z-10 flex flex-col items-center justify-end w-full h-full">
        <BannerShapeOuter />
      </div>
    </div>
  )
}
