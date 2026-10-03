import { lazy, Suspense } from 'react'
import { academy } from '../data/academyData.js'

const InteractiveCube = lazy(() => import('./InteractiveCube.jsx'))

export default function Hero({ onNavigate }) {
  const handleJoinClassClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('/join-class')
    } else {
      window.location.hash = 'join-class'
    }
  }

  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-[90vh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-2 md:pt-32"
    >
      {/* Background radial glow */}
      <div
        className="absolute -left-20 top-40 h-80 w-80 rounded-full bg-blue/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Left Column: Academy Headings and CTA */}
      <div className="relative z-10 text-center md:text-left">
        <h1 className="hero-enter hero-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          MEGLEV <span className="text-blue">CUBING</span> ACADEMY
        </h1>
        <p className="hero-enter hero-tagline mt-4 font-display text-2xl font-bold text-yellow sm:text-3xl">
          “{academy.tagline}”
        </p>
        <p className="hero-enter hero-slogan mt-2 text-lg font-semibold text-cyan sm:text-xl">
          “{academy.slogan}”
        </p>
        <p className="hero-enter hero-description mt-5 max-w-lg text-slate-300 text-base sm:text-lg leading-relaxed mx-auto md:mx-0">
          “{academy.description}”
        </p>
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
          <a
            href="#join-class"
            onClick={handleJoinClassClick}
            className="hero-enter hero-cta hero-cta-first btn btn-yellow text-base font-bold shadow-lg"
          >
            Join a Class
          </a>
          <a
            href={academy.formUrl}
            target="_blank"
            rel="noreferrer"
            className="hero-enter hero-cta hero-cta-second btn btn-line text-base font-semibold"
          >
            Register Now
          </a>
        </div>
      </div>

      <div className="interactive-cube-slot relative z-10 flex min-h-[19rem] items-center justify-center md:min-h-[22rem]">
        <Suspense fallback={null}>
          <InteractiveCube />
        </Suspense>
      </div>
    </section>
  )
}
