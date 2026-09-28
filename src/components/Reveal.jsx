import { useEffect, useRef, useState } from 'react'
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); o.disconnect() } }, { threshold: 0.15 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>{children}</div>
}
