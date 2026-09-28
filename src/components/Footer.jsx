import { academy, nav } from '../data/academyData.js'

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, hash) => {
    if (onNavigate) {
      onNavigate('/')
    }
  }

  return (
    <footer className="border-t border-white/10 bg-black/40 px-5 py-12 text-center">
      <p className="font-display text-2xl font-extrabold tracking-tight">
        MEG<span className="text-yellow">LEV</span> CUBING ACADEMY
      </p>
      <p className="mt-2 text-sm font-semibold text-yellow">“{academy.tagline}”</p>
      <p className="text-sm font-medium text-orange">“{academy.slogan}”</p>

      <ul className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
        {nav.map(([l, h]) => (
          <li key={h}>
            <a
              href={h}
              onClick={(e) => handleNavClick(e, h)}
              className="text-slate-300 hover:text-yellow transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-slate-500">
        © 2026 Meglev Cubing Academy. All rights reserved.
      </p>
    </footer>
  )
}
