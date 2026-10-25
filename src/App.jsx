import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--acc)] selection:text-white">
      <Navbar />
      <main>
        <Home />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 border-t border-gray-100 text-center text-xs text-[var(--mute)]">
        © {new Date().getFullYear()} Ayush Gandhi. Built with React & Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
