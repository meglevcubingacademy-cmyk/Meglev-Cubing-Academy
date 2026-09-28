import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Benefits from '../components/Benefits.jsx'
import Cubes from '../components/Cubes.jsx'
import Levels from '../components/Levels.jsx'
import Classes from '../components/Classes.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Registration from '../components/Registration.jsx'
import Fees from '../components/Fees.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen">
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <About />
        <Benefits />
        <Cubes />
        <Levels />
        <Classes />
        <HowItWorks />
        <Registration />
        <Fees />
        <Contact />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
