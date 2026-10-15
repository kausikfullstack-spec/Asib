import { Navbar } from './components/navbar';
import { Hero, Couple, Story, Celebration, Gallery, Footer } from './components/invitation';
import { RevealProvider } from './components/reveal-provider';
import { InvitationEntry } from './components/invitation-entry';
export default function Home() { return <InvitationEntry><RevealProvider><Navbar /><main id="home" tabIndex={-1}><Hero /><Couple /><Story /><Celebration /><Gallery /></main><Footer /></RevealProvider></InvitationEntry>; }
