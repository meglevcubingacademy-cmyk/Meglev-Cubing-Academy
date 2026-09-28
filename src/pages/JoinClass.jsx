import { ArrowLeft, Sparkles, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Cube3D from '../components/Cube3D.jsx'
import { academy } from '../data/academyData.js'

export default function JoinClass({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar onNavigate={onNavigate} />
      <main className="flex-1 mx-auto max-w-4xl px-5 pt-32 pb-20 w-full flex flex-col justify-center">
        <div className="glass relative overflow-hidden p-8 sm:p-12 text-center border-blue/40 shadow-2xl">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-yellow/10 blur-3xl pointer-events-none" />

          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <Cube3D size={100} n={3} scrambled />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow/10 border border-yellow/30 text-yellow text-xs font-semibold mb-4">
            <Sparkles size={14} /> Admissions & Enrollments
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Join a <span className="text-blue">Class</span>
          </h1>

          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Class details and enrollment information will be available here soon.
          </p>

          <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
            We are preparing comprehensive schedules, curriculum guides, and batch timings for Daily, Weekly, and Online sessions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('/')
                else window.location.href = '/'
              }}
              className="btn btn-line text-sm"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>

            <a
              href={academy.formUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-yellow text-sm"
            >
              Register Now <ExternalLink size={15} />
            </a>

            <a
              href={`https://wa.me/${academy.business.whatsapp}?text=${encodeURIComponent('Hello MEGLEV Cubing Academy, I would like to make an enquiry regarding joining a class.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line border-green/40 text-green hover:bg-green/10 text-sm"
            >
              <MessageCircle size={16} /> Enquire on WhatsApp
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-lg bg-black/20 border border-white/5">
              <p className="text-xs text-yellow font-semibold uppercase tracking-wider">Direct Enquiries</p>
              <p className="mt-1 text-sm text-slate-200 font-medium">Daily & Weekly Batches</p>
              <a href={`tel:+91${academy.business.phone}`} className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-yellow">
                <Phone size={12} /> {academy.business.phone}
              </a>
            </div>
            <div className="p-4 rounded-lg bg-black/20 border border-white/5">
              <p className="text-xs text-blue font-semibold uppercase tracking-wider">Online Learning</p>
              <p className="mt-1 text-sm text-slate-200 font-medium">Global 1-on-1 Sessions</p>
              <a href={`mailto:${academy.business.email}`} className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue">
                <Mail size={12} /> {academy.business.email}
              </a>
            </div>
            <div className="p-4 rounded-lg bg-black/20 border border-white/5">
              <p className="text-xs text-green font-semibold uppercase tracking-wider">Location</p>
              <p className="mt-1 text-sm text-slate-200 font-medium">{academy.location}</p>
              <p className="mt-2 text-xs text-slate-400">Thoothukudi & Online</p>
            </div>
          </div>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
