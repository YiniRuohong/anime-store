"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  title: string
  images: string[]
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const cleanImages = useMemo(() => Array.from(new Set(images.map((image) => image.trim()).filter(Boolean))), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const hasMultipleImages = cleanImages.length > 1

  useEffect(() => {
    if (!hasMultipleImages || paused) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % cleanImages.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [cleanImages.length, hasMultipleImages, paused])

  useEffect(() => {
    if (activeIndex >= cleanImages.length) setActiveIndex(0)
  }, [activeIndex, cleanImages.length])

  if (cleanImages.length === 0) return null

  function goToPrevious() {
    setActiveIndex((index) => (index - 1 + cleanImages.length) % cleanImages.length)
  }

  function goToNext() {
    setActiveIndex((index) => (index + 1) % cleanImages.length)
  }

  return (
    <div
      className="surface overflow-hidden rounded-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] bg-sakura-50">
        {cleanImages.map((image, index) => (
          <Image
            alt={`${title} 图片 ${index + 1}`}
            className={`object-cover transition-opacity duration-700 ease-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            fill
            key={image}
            priority={index === 0}
            sizes="(min-width: 1024px) 48vw, 100vw"
            src={image}
            unoptimized
          />
        ))}

        {hasMultipleImages ? (
          <>
            <button
              aria-label="上一张商品图片"
              className="icon-button absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-white/85 shadow-sm backdrop-blur"
              onClick={goToPrevious}
              type="button"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              aria-label="下一张商品图片"
              className="icon-button absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-white/85 shadow-sm backdrop-blur"
              onClick={goToNext}
              type="button"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
              {cleanImages.map((image, index) => (
                <button
                  aria-label={`查看第 ${index + 1} 张商品图片`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-sakura-500" : "w-2.5 bg-ink-300 hover:bg-sakura-300"
                  }`}
                  key={image}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="flex gap-3 overflow-x-auto border-t border-sakura-100 bg-white/70 p-3">
          {cleanImages.map((image, index) => (
            <button
              aria-label={`切换到第 ${index + 1} 张商品图片`}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-card border transition ${
                index === activeIndex ? "border-sakura-400 ring-2 ring-sakura-100" : "border-white hover:border-sakura-200"
              }`}
              key={image}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image alt="" className="object-cover" fill sizes="80px" src={image} unoptimized />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
