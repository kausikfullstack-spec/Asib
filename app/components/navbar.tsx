"use client";
import { useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
const links = [["The couple", "couple"], ["Our story", "story"], ["Celebration", "celebration"], ["The memories", "memories"]];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    {/* <a className="wordmark" href="#home" aria-label="Asib and Nadia home">A<span>&</span>N
 
  </a> */}
  <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <>Close <FiX aria-hidden="true" /></> : <>Menu <FiMenu aria-hidden="true" /></>}</button><nav id="main-navigation" aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-invite" href="#celebration" onClick={() => setOpen(false)}>You’re invited <FiArrowUpRight aria-hidden="true" /></a></nav></header>;
}
