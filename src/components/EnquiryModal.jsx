import { useEffect, useRef } from 'react'
import { X, MessageCircle, Mail, Sparkles } from 'lucide-react'
import { academy } from '../data/academyData.js'

export default function EnquiryModal({ cls, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    // Focus the modal when opened
    modalRef.current?.focus()

    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!cls) return null

  const whatsappUrl = `https://wa.me/${academy.business.whatsapp}?text=${encodeURIComponent(
    cls.whatsappMessage
  )}`

  const emailUrl = `mailto:${academy.business.email}?subject=${encodeURIComponent(
    cls.emailSubject
  )}&body=${encodeURIComponent(cls.emailBody)}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="glass relative w-full max-w-md overflow-hidden p-6 sm:p-8 border-yellow/30 shadow-2xl bg-ink/95 outline-none"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow mb-2">
          <Sparkles size={14} /> Class Enquiry
        </div>

        <h3 id="modal-title" className="text-2xl font-extrabold text-slate-100">
          Enquire for {cls.title}
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          How would you like to connect with our academy mentors?
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="btn w-full justify-center bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-green/20 font-bold"
          >
            <MessageCircle size={20} />
            Enquire via WhatsApp
          </a>

          <a
            href={emailUrl}
            onClick={onClose}
            className="btn w-full justify-center btn-line border-blue/40 text-blue hover:bg-blue/15 font-semibold"
          >
            <Mail size={20} />
            Enquire via Email
          </a>

          <button
            type="button"
            onClick={onClose}
            className="btn w-full justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-sm font-medium mt-1"
          >
            Cancel
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Quick response guaranteed within 24 hours.
        </p>
      </div>
    </div>
  )
}
