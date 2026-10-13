import { Navbar } from './components/navbar';
import { Hero, Couple, Story, Celebration, Gallery, Footer } from './components/invitation';
import { RevealProvider } from './components/reveal-provider';
export default function Home() { return <RevealProvider><Navbar /><main id="home"><Hero /><Couple /><Story /><Celebration /><Gallery /></main><Footer /></RevealProvider>; }
