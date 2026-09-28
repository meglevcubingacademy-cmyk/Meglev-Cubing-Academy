import { CheckCircle2, Award, Zap, Flame } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { levels } from '../data/academyData.js'

const ICONS = {
  green: Award,
  yellow: Zap,
  orange: Flame,
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
          return (
            <Reveal key={lvl.level} delay={i * 120} className="h-full">
              <div
                className={`glass group relative flex h-full flex-col justify-between border-t-4 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                  lvl.accent === 'green'
                    ? 'border-t-green hover:border-green/80 hover:shadow-green/10'
                    : lvl.accent === 'yellow'
                    ? 'border-t-yellow hover:border-yellow/80 hover:shadow-yellow/10'
                    : 'border-t-orange hover:border-orange/80 hover:shadow-orange/10'
                }`}
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
                    className={`mt-4 font-display text-2xl font-extrabold tracking-tight ${
                      lvl.accent === 'green'
                        ? 'text-green'
                        : lvl.accent === 'yellow'
                        ? 'text-yellow'
                        : 'text-orange'
                    }`}
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
                        className={`text-xs font-semibold italic ${
                          lvl.accent === 'green'
                            ? 'text-green/90'
                            : lvl.accent === 'yellow'
                            ? 'text-yellow/90'
                            : 'text-orange/90'
                        }`}
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
                          className={`shrink-0 ${
                            lvl.accent === 'green'
                              ? 'text-green'
                              : lvl.accent === 'yellow'
                              ? 'text-yellow'
                              : 'text-orange'
                          }`}
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
