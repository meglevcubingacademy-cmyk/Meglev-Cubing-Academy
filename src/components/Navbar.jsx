import { useEffect, useState } from 'react'
import { ExternalLink, Menu, X } from 'lucide-react'
import { academy, nav } from '../data/academyData.js'

export default function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const handleNavClick = (e, hash) => {
    if (onNavigate) {
      onNavigate('/')
    }
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ease-out ${
        scrolled ? 'bg-ink/95 shadow-lg shadow-black/20' : 'bg-ink/85'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5"
        aria-label="Main Navigation"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-display text-lg font-extrabold tracking-tight"
        >
          MEG<span className="text-yellow">LEV</span>{' '}
          <span className="hidden text-sm font-semibold text-slate-400 sm:inline">
            Cubing Academy
          </span>
        </a>

        <ul className="hidden gap-7 md:flex">
          {nav.map(([l, h]) => (
            <li key={h}>
              <a
                href={h}
                onClick={(e) => handleNavClick(e, h)}
                className="text-sm font-medium text-slate-300 transition hover:text-yellow"
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href={academy.chessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-slate-300 transition hover:text-yellow"
            >
              Chess Academy <ExternalLink size={14} aria-hidden="true" />
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={academy.formUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow hidden !py-2 text-xs md:inline-flex"
          >
            Register Now
          </a>

          <button
            type="button"
            className="p-2 text-slate-200 hover:text-yellow md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-lg md:hidden">
          <ul className="space-y-1">
            {nav.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  onClick={(e) => handleNavClick(e, h)}
                  className="block py-3 text-base font-medium text-slate-200 hover:text-yellow"
                >
                  {l}
                </a>
              </li>
            ))}
            <li>
              <a
                href={academy.chessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 text-base font-medium text-slate-200 hover:text-yellow"
              >
                Chess Academy <ExternalLink size={16} aria-hidden="true" />
              </a>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href={academy.formUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-yellow w-full justify-center text-sm font-bold"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
