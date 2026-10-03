import { Phone, Mail, MapPin, MessageCircle, User, Building2, Instagram } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { academy } from '../data/academyData.js'

const itemClass =
  'flex items-center gap-3.5 p-3.5 rounded-xl bg-panel/70 border border-border text-slate-100 transition-all duration-200 hover:bg-blue/10 hover:border-blue/60 hover:text-blue hover:translate-x-1'

export default function Contact() {
  const { personal: p, business: b } = academy

  const personalWaMessage = encodeURIComponent(
    'Hello Mohammed Aseel, I would like to connect with you regarding Meglev Cubing Academy.'
  )
  const businessWaMessage = encodeURIComponent(
    'Hello MEGLEV Cubing Academy, I would like to make an enquiry.'
  )

  return (
    <Section
      id="contact"
      title="Contact Us"
      intro="Reach out directly for class schedules, custom batches, or any questions."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Personal Contact Card */}
        <Reveal>
          <div className="glass flex h-full flex-col justify-between p-7 sm:p-8 border-white/10 hover:border-blue/50 transition-colors">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/15 text-blue">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{p.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">Head Instructor & Founder</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Personal Phone */}
                <a
                  className={itemClass}
                  href={`tel:+91${p.phone}`}
                  aria-label={`Call ${p.name}`}
                >
                  <Phone size={18} className="text-blue shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Phone</p>
                    <p className="text-sm font-semibold">{p.phone}</p>
                  </div>
                </a>

                {/* Personal Email */}
                <a
                  className={itemClass}
                  href={`mailto:${p.email}`}
                  aria-label={`Email ${p.name}`}
                >
                  <Mail size={18} className="text-blue shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Email</p>
                    <p className="text-sm font-semibold break-all">{p.email}</p>
                  </div>
                </a>

                {/* Personal WhatsApp */}
                <a
                  className={itemClass}
                  href={`https://wa.me/${p.whatsapp}?text=${personalWaMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`WhatsApp ${p.name}`}
                >
                  <MessageCircle size={18} className="text-yellow shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">WhatsApp</p>
                    <p className="text-sm font-semibold">{p.phone}</p>
                  </div>
                </a>

                <a
                  className={itemClass}
                  href={p.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Founder Instagram @_itz_aseel_offil_"
                >
                  <Instagram size={18} className="text-blue shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Founder Instagram</p>
                    <p className="text-sm font-semibold">@_itz_aseel_offil_</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </Reveal>

        {/* Business / Academy Enquiries Contact Card */}
        <Reveal delay={100}>
          <div className="glass flex h-full flex-col justify-between p-7 sm:p-8 border-white/10 hover:border-yellow/50 transition-colors">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Business / Academy Enquiries</h3>
                  <p className="text-xs text-slate-400 font-medium">Admissions & Official Academy Support</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Business Phone */}
                <a
                  className={itemClass}
                  href={`tel:+91${b.phone}`}
                  aria-label="Call Business Support"
                >
                  <Phone size={18} className="text-yellow shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Phone</p>
                    <p className="text-sm font-semibold">{b.phone}</p>
                  </div>
                </a>

                {/* Business Email */}
                <a
                  className={itemClass}
                  href={`mailto:${b.email}`}
                  aria-label="Email Business Support"
                >
                  <Mail size={18} className="text-yellow shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Email</p>
                    <p className="text-sm font-semibold break-all">{b.email}</p>
                  </div>
                </a>

                {/* Business WhatsApp */}
                <a
                  className={itemClass}
                  href={`https://wa.me/${b.whatsapp}?text=${businessWaMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Business Support"
                >
                  <MessageCircle size={18} className="text-yellow shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">WhatsApp</p>
                    <p className="text-sm font-semibold">{b.phone}</p>
                  </div>
                </a>

                <a
                  className={itemClass}
                  href={academy.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Academy Instagram @meglevcubing"
                >
                  <Instagram size={18} className="text-yellow shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Academy Instagram</p>
                    <p className="text-sm font-semibold">@meglevcubing</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Academy Location */}
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-300">
        <MapPin size={18} className="text-yellow shrink-0" />
        <span>{academy.location}</span>
      </div>
    </Section>
  )
}
