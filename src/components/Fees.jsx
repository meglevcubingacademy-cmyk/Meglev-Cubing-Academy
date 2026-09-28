import { Phone, Mail, MessageCircle } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { academy } from '../data/academyData.js'

export default function Fees() {
  const b = academy.business
  const feeWaMessage = encodeURIComponent(
    'Hello MEGLEV Cubing Academy, I would like to know about class fees, schedules, and enrollment availability.'
  )

  return (
    <section id="fees" className="mx-auto max-w-4xl px-5 py-14 text-center">
      <Reveal>
        <h2 className="text-2xl font-extrabold sm:text-3xl tracking-tight">
          Interested in class fees and schedules?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Contact our academy team for current fee structures, batch availability, and enrollment information.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${b.whatsapp}?text=${feeWaMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold shadow-lg"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
          <a
            href={`tel:+91${b.phone}`}
            className="btn btn-yellow font-bold"
          >
            <Phone size={18} />
            Call {b.phone}
          </a>
          <a
            href={`mailto:${b.email}?subject=${encodeURIComponent('Enquiry - Class Fees & Schedules')}`}
            className="btn btn-line"
          >
            <Mail size={18} />
            Email Us
          </a>
        </div>
      </Reveal>
    </section>
  )
}
