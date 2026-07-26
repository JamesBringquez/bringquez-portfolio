import Navbar from "../components/Navbar"
import ScrollProgress from "../components/ScrollProgress"
import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Services from "../components/Services"
import Skills from "../components/Skills"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
