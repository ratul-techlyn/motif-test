'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

interface SliderItem {
  url: string
}

interface GsapImageMarqueeProps {
  sliderList: SliderItem[]
}

const GsapImageMarquee: React.FC<GsapImageMarqueeProps> = ({ sliderList }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = marqueeRef.current
      if (!el) return

      // Duplicate the track for seamless loop illusion
      gsap.set('.marquee-track', { x: 0 })

      gsap.to('.marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 40, // adjust for speed
        ease: 'linear',
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section>
      <div
        ref={marqueeRef}
        className="overflow-hidden w-full"
      >
        <div className="flex marquee-track">
          {[...sliderList, ...sliderList].map((item, idx) => (
            <div
              key={idx}
              className="!w-auto rounded-lg overflow-hidden mx-2"
            >
              <Image
                className="w-full h-auto"
                src={item.url}
                alt={`Slide ${idx + 1}`}
                width={500}
                height={500}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GsapImageMarquee