import Reveal from './Reveal.jsx'
export default function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 ${className}`}>
      <Reveal className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-slate-300">{intro}</p>}
      </Reveal>
      {children}
    </section>
  )
}
