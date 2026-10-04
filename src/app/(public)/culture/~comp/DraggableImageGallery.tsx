'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const imageConfigs = [
  { src: 'img01', x: '15vw', y: '10vh', rotate: -12, width: 380, height: 280, z: 3 },
  { src: 'img02', x: '70vw', y: '8vh',  rotate: 10,  width: 360, height: 270, z: 2 },
  { src: 'img03', x: '50vw', y: '15vh', rotate: -4,  width: 400, height: 300, z: 5 },
  { src: 'img04', x: '25vw', y: '35vh', rotate: 17,  width: 350, height: 250, z: 4 },
  { src: 'img05', x: '60vw', y: '45vh', rotate: -8,  width: 390, height: 290, z: 1 },
];

const DraggableGallery = () => {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const instances: Draggable[] = [];

    refs.current.forEach((el, idx) => {
      if (!el) return;

      const { x, y, rotate, z } = imageConfigs[idx];

      gsap.set(el, {
        x, y, rotate,
        position: 'absolute',
        zIndex: z,
        willChange: 'transform',
        opacity: 1,
      });

      gsap.fromTo(
        el,
        { opacity: 0, y: '+=40', rotate: rotate - 8 },
        { opacity: 1, y, rotate, duration: 0.8, ease: 'power3.out', delay: idx * 0.15 }
      );

      const d = Draggable.create(el, {
        type: 'x,y',
        bounds: containerRef.current || document.body,
        inertia: true,           // InertiaPlugin
        edgeResistance: 0.65,
        autoScroll: 0,           // number, 0 disables
        onPress() { gsap.to(el, { zIndex: 9999 }); },
      })[0];

      if (d) instances.push(d);
    });

    return () => instances.forEach(d => d.kill());
  }, []);

  const setImgRef = (idx: number) => (el: HTMLImageElement | null) => {
    refs.current[idx] = el;     // ← returns void
  };

  return (
    <div
      className="dragable_container"
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'visible', zIndex: 0 }}
    >
      <div id="image-container" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>
        {imageConfigs.map((img, idx) => (
          <Image
            key={idx}
            ref={setImgRef(idx)}
            src={`/assets/process/drugableImgs/${img.src}.jpg`}
            alt={`Motif Collage ${idx}`}
            width={img.width}
            height={img.height}
            unoptimized
            className="draggable-image"
            style={{
              position: 'absolute',
              width: `${img.width}px`,
              height: `${img.height}px`,
              objectFit: 'cover',
              cursor: 'grab',
              transform: 'translateZ(0)',
              willChange: 'transform',
              touchAction: 'none',
              WebkitTapHighlightColor: 'transparent',
              border: 'none',
              outline: 'none',
              opacity: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DraggableGallery;