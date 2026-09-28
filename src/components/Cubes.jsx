import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Cube3D from './Cube3D.jsx'
import PuzzleIcon from './PuzzleIcon.jsx'
import { cubes } from '../data/academyData.js'

export default function Cubes() {
  return (
    <Section
      id="cubes"
      title="Cubes & Puzzles We Teach"
      intro="From WCA competition cubes to fascinating twisty shape-mod puzzles."
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cubes.map((c, i) => (
          <li key={c.name} className="h-full">
            <Reveal delay={(i % 4) * 60} className="h-full">
              <div className="glass group relative flex flex-col items-center justify-between gap-4 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue/70 hover:shadow-2xl hover:shadow-blue/15 h-full">
                {/* Puzzle Illustration Area */}
                <div className="flex h-32 w-full items-center justify-center pt-2">
                  {c.n ? (
                    <Cube3D n={c.n} size={c.n === 2 ? 72 : c.n === 3 ? 76 : 80} small scrambled />
                  ) : (
                    <PuzzleIcon kind={c.kind} />
                  )}
                </div>

                {/* Puzzle Info */}
                <div className="mt-2 w-full border-t border-white/10 pt-3.5">
                  <h3 className="font-display text-lg font-bold text-slate-100 group-hover:text-yellow transition-colors">
                    {c.name}
                  </h3>
                  <span className="mt-1 inline-block text-xs font-medium text-slate-400">
                    {c.n ? `${c.n}×${c.n} Speedcube` : 'Twisty Puzzle'}
                  </span>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
