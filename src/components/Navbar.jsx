import { useEffect, useState } from 'react'
import { Box, ExternalLink, Menu, X } from 'lucide-react'
import { academy, nav } from '../data/academyData.js'
import MeglevLogo from './MeglevLogo.jsx'

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
      className={`fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-md transition-[background-color,box-shadow] duration-300 ease-out ${
        scrolled ? 'bg-ink/95 shadow-lg shadow-black/20' : 'bg-ink/90'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5"
        aria-label="Main Navigation"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex shrink-0 items-center"
          aria-label="MEGLEV Cubing Academy home"
        >
          <MeglevLogo size={38} showText />
        </a>

        {/* Navigation links for Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
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
        </ul>

        {/* Auto-aligned Action Buttons (Displayed on ALL displays) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={academy.chessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border bg-[#0d1428] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-yellow transition hover:border-yellow/50 hover:bg-yellow/10 hover:text-yellow whitespace-nowrap shadow-sm"
          >
            <Box size={14} className="shrink-0 sm:w-4 sm:h-4" aria-hidden="true" />
            <span>Chess Academy</span>
            <ExternalLink size={12} className="shrink-0 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
          </a>

          <a
            href={academy.formUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-yellow px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold text-ink transition hover:bg-[#ffe36b] shadow-md shadow-yellow/15 whitespace-nowrap"
          >
            Register Now
          </a>

          <button
            type="button"
            className="p-1.5 text-slate-200 hover:text-yellow lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer for Navigation Links */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-lg lg:hidden">
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
          </ul>
        </div>
      )}
    </header>
  )
}
