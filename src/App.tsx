import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Education from "./components/Education";
import Shop from "./components/Shop";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Portfolio />
        <Education />
        <Shop />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
