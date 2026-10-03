import { ArrowUp, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import BrandIcon from './BrandIcon.jsx'
import { academy, nav } from '../data/academyData.js'

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, hash) => {
    if (onNavigate) {
      onNavigate('/')
    }
  }

  const enquiryUrl = `https://wa.me/${academy.business.whatsapp}?text=${encodeURIComponent(
    'Hello MEGLEV Cubing Academy, I would like to make an enquiry.'
  )}`

  return (
    <footer className="border-t border-border bg-[#050812] px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:gap-16">
        <div>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-3">
            <BrandIcon />
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-100">
              MEG<span className="text-yellow">LEV</span> Cubing Academy
            </span>
          </a>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-yellow">
            {academy.tagline}
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            {academy.description}
          </p>
          <a
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow transition hover:text-slate-100"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Enquire Now
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-100">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-slate-300 transition-colors hover:text-yellow"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={academy.chessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 font-medium text-yellow transition hover:border-yellow/50 hover:bg-yellow/5"
              >
                <span>Chess Academy</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
            <li className="pt-1">
              <a
                href={academy.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-yellow"
              >
                Online Registration Form
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-100">
            Academy Information
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-300">
            <li>
              <a href={`tel:+91${academy.business.phone}`} className="inline-flex items-start gap-3 transition hover:text-yellow">
                <Phone size={17} className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
                <span>+91 {academy.business.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${academy.business.email}`} className="inline-flex items-start gap-3 transition hover:text-yellow">
                <Mail size={17} className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
                <span className="break-all">{academy.business.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
              <span>{academy.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-border pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Meglev Cubing Academy. All rights reserved.</p>
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-2 transition hover:text-yellow">
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
