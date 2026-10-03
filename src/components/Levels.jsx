import { CheckCircle2, Award, Zap, Flame } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { levels } from '../data/academyData.js'

const ICONS = {
  blue: Award,
  yellow: Zap,
  cyan: Flame,
}

const accents = {
  blue: {
    border: 'border-t-blue hover:border-blue/80 hover:shadow-blue/10',
    title: 'text-blue',
    quote: 'text-blue/90',
    icon: 'text-blue',
  },
  yellow: {
    border: 'border-t-yellow hover:border-yellow/80 hover:shadow-yellow/10',
    title: 'text-yellow',
    quote: 'text-yellow/90',
    icon: 'text-yellow',
  },
  cyan: {
    border: 'border-t-cyan hover:border-cyan/80 hover:shadow-cyan/10',
    title: 'text-cyan',
    quote: 'text-cyan/90',
    icon: 'text-cyan',
  },
}

export default function Levels() {
  return (
    <Section
      id="levels"
      title="Learning Levels"
      intro="A clear step-by-step pathway from your first solve to competition-level mastery."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
        {levels.map((lvl, i) => {
          const IconComponent = ICONS[lvl.accent] || Award
          const accent = accents[lvl.accent] || accents.blue
          return (
            <Reveal key={lvl.level} delay={i * 120} className="h-full">
              <div
                className={`glass group relative flex h-full flex-col justify-between border-t-4 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.border}`}
              >
                <div>
                  {/* Top Level Header & Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${lvl.badgeClass}`}
                    >
                      <IconComponent size={14} />
                      {lvl.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-500">LEVEL 0{i + 1}</span>
                  </div>

                  <h3
                    className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-100"
                  >
                    {lvl.level}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {lvl.description}
                  </p>

                  {/* Motivational Quotes Box */}
                  <div className="mt-5 rounded-xl bg-black/25 p-4 border border-white/5 space-y-1.5">
                    {lvl.slogans.map((slogan, sIdx) => (
                      <p
                        key={sIdx}
                        className={`text-xs font-semibold italic ${accent.quote}`}
                      >
                        “{slogan}”
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    What you will learn:
                  </p>
                  <ul className="space-y-2">
                    {lvl.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2
                          size={14}
                          className={`shrink-0 ${accent.icon}`}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
