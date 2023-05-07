import Hero from './components/Hero';
import Contact from './components/Contact';
import About from './components/About';
import Tools from './components/Tools';
import styled from 'styled-components';
import Projects from './components/Projects';
import Interests from './components/Interests';


const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url('./img/bg.jpeg');
  &::-webkit-scrollbar{
    display: none;
  }
`

function App() {

  return (
    <Container>
      <Hero />
      <About />
      <Projects />
      <Tools />
      <Interests />
      <Contact />
    </Container>
  )
}

export default App
