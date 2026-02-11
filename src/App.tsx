import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Schedule } from './components/sections/Schedule';
import { Gallery } from './components/sections/Gallery';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { WaveDivider } from './components/ui/WaveDivider';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WaveDivider from="#F7931E" to="#1A1A1A" />
      <About />
      <WaveDivider from="#1A1A1A" to="#2D2D2D" />
      <Services />
      <WaveDivider from="#2D2D2D" to="#1A1A1A" />
      <Schedule />
      <WaveDivider from="#1A1A1A" to="#2D2D2D" />
      <Gallery />
      <WaveDivider from="#2D2D2D" to="#1A1A1A" />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
