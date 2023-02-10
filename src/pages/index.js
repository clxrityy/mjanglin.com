import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Jump from '@/components/Jump';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';


export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Jump />
      </main>
    </>
  )
}
