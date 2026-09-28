import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { benefits } from '../data/academyData.js'
const accents = ['border-t-blue', 'border-t-green', 'border-t-yellow', 'border-t-orange']
export default function Benefits() {
  return (
    <Section title="Why Meglev?">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([e, t, d], i) => (
          <Reveal key={t} delay={i * 80}>
            <div className={`glass h-full border-t-4 p-6 transition hover:-translate-y-1 ${accents[i]}`}>
              <div className="text-3xl" aria-hidden="true">{e}</div>
              <h3 className="mt-3 text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-slate-300">{d}</p>
            </div>
          </Reveal>))}
      </div>
    </Section>
  )
}
