import { Check } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { academy, whoCanJoin } from '../data/academyData.js'
export default function About() {
  return (
    <Section id="about" title="About the academy" intro={academy.about}>
      <Reveal>
        <h3 className="mb-4 text-xl font-semibold">Who can join?</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {whoCanJoin.map((w) => <li key={w} className="glass flex items-center gap-3 px-4 py-3"><Check className="shrink-0 text-blue" size={18} />{w}</li>)}
        </ul>
      </Reveal>
    </Section>
  )
}
