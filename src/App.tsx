import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Shop = lazy(() => import("./components/Shop"));
const Booking = lazy(() => import("./components/Booking"));

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
        <Suspense fallback={null}>
          <Shop />
          <Booking />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
