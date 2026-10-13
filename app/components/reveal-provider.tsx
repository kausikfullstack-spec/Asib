"use client";
import { useEffect } from "react";
export function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(element => {
      const siblings = Array.from(element.parentElement?.children ?? []).filter(child => child.hasAttribute("data-reveal"));
      element.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(element), 3) * 90}ms`);
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    const showAll = () => {
      if (motionPreference.matches) {
        observer.disconnect();
        elements.forEach(element => element.classList.add("revealed"));
      }
    };
    motionPreference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", showAll);
      elements.forEach(element => { element.classList.remove("reveal-ready", "revealed"); element.style.removeProperty("--reveal-delay"); });
    };
  }, []);
  return <>{children}</>;
}
