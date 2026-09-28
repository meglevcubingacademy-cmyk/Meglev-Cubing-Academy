import Reveal from './Reveal.jsx'
import Cube3D from './Cube3D.jsx'
import { academy } from '../data/academyData.js'
export default function Registration() {
  return (
    <section id="register" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <div className="glass flex flex-col items-center gap-6 border-blue/50 p-10 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to Start Cubing?</h2>
            <p className="mt-3 text-slate-300">Take your first step toward becoming a better solver.</p>
            <a href={academy.formUrl} target="_blank" rel="noreferrer" className="btn btn-yellow mt-6">Register Now</a>
          </div>
          <Cube3D size={110} scrambled small />
        </div>
      </Reveal>
    </section>
  )
}
