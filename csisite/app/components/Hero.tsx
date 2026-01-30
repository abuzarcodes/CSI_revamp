'use client';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id='#home' className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Animated blue lines */}
      <motion.div
        className="absolute top-0 left-0 w-px bg-blue-500"
        style={{ height: '40vh', left: '15%' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-px bg-blue-500"
        style={{ width: '30vw', right: '10%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Subtle moving accent */}
      <motion.div
        className="absolute w-200 h-200 bg-blue-500 rounded-full opacity-10 blur-3xl bg-radial pointer-events-none"
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{ top: -200, right: -100 }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-7xl">
          {/* Off-center oversized typography */}
          <motion.div
            className="ml-0 md:ml-12 lg:ml-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <span className="text-blue-500 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                CSI Chapter
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight mb-8 max-w-5xl">
              Code
              <br />
              <span className="text-blue-500">Culture</span>
              <br />
              Community
            </h1>

            <motion.div
              className="flex flex-col gap-4 mt-16 ml-0 md:ml-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
                Where innovation meets
                <br />
                execution. Where ideas
                <br />
                become systems.
              </p>
            </motion.div>
          </motion.div>

          {/* Year marker */}
          <motion.div
            className="absolute bottom-100 md:bottom-32 right-8 md:right-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="text-right">
              <div className="text-6xl md:text-8xl font-light text-gray-800">1965</div>
              <div className="text-sm text-gray-500 tracking-widest mt-2">ESTD</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>
    </section>
  );
}
