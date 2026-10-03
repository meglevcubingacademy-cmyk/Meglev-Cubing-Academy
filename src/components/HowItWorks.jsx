import * as Icons from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { steps } from '../data/academyData.js'
export default function HowItWorks() {
  return (
    <Section title="How it works">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(([t, icon], i) => {
          const Icon = Icons[icon]
          return (
            <li key={t}>
              <Reveal delay={i * 80}>
                <div className="glass h-full p-5 text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue font-bold text-white">{i + 1}</span>
                  <Icon className="mx-auto mt-4 text-yellow" />
                  <h3 className="mt-3 font-semibold">{t}</h3>
                </div>
              </Reveal>
            </li>)
        })}
      </ol>
    </Section>
  )
}
