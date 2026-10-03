import { useState } from 'react'
import * as Icons from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import EnquiryModal from './EnquiryModal.jsx'
import { classes } from '../data/academyData.js'

export default function Classes() {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <Section
      id="classes"
      title="Class Options"
      intro="Structured flexible programs designed to fit every student's learning goals and schedule."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {classes.map((cls, i) => {
          const Icon = Icons[cls.icon] || Icons.BookOpen
          return (
            <Reveal key={cls.id} delay={i * 100} className="h-full">
              <div className="glass group relative flex h-full flex-col justify-between p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue/70 hover:shadow-xl hover:shadow-blue/10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/10 border border-yellow/20 text-yellow group-hover:scale-110 transition-transform">
                      <Icon size={26} />
                    </div>
                    {cls.badge && (
                      <span className="rounded-full bg-panel px-3 py-1 text-[11px] font-semibold text-slate-300 border border-border">
                        {cls.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-slate-100 group-hover:text-blue transition-colors">
                    {cls.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {cls.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className="btn btn-line w-full justify-center group-hover:bg-blue/10 transition-all font-semibold"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Interactive Enquiry Modal */}
      {selectedClass && (
        <EnquiryModal
          cls={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </Section>
  )
}
