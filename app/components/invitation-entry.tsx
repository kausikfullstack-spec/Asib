'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { FiArrowRight, FiArrowUp, FiHeart, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { people } from '../wedding-details';

export function InvitationEntry({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [entered, setEntered] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const music = useRef<HTMLAudioElement>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const cardStage = useRef<HTMLDivElement>(null);
  const cardBook = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entered) return;
    const stage = cardStage.current;
    const book = cardBook.current;
    if (!stage || !book) return;

    const fitCard = () => {
      const entry = stage.parentElement!;
      const heading = entry.querySelector<HTMLElement>('.entry-heading')!;
      const footnote = entry.querySelector<HTMLElement>('.entry-footnote')!;
      const entryStyle = getComputedStyle(entry);
      const headingStyle = getComputedStyle(heading);
      const footnoteStyle = getComputedStyle(footnote);
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const availableWidth = entry.clientWidth - parseFloat(entryStyle.paddingLeft) - parseFloat(entryStyle.paddingRight);
      const availableHeight = viewportHeight - parseFloat(entryStyle.paddingTop) - parseFloat(entryStyle.paddingBottom)
        - heading.offsetHeight - parseFloat(headingStyle.marginBottom)
        - footnote.offsetHeight - parseFloat(footnoteStyle.marginTop) - 18;
      const scale = Math.min(1, availableWidth / book.offsetWidth, Math.max(120, availableHeight) / book.offsetHeight);
      book.style.setProperty('--card-scale', String(scale));
      stage.style.width = `${book.offsetWidth * scale}px`;
      stage.style.height = `${book.offsetHeight * scale}px`;
    };

    const observer = new ResizeObserver(fitCard);
    observer.observe(book);
    observer.observe(stage.parentElement!);
    window.addEventListener('resize', fitCard);
    window.visualViewport?.addEventListener('resize', fitCard);
    fitCard();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fitCard);
      window.visualViewport?.removeEventListener('resize', fitCard);
    };
  }, [entered]);

  useEffect(() => {
    if (!opened) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const focusTimer = window.setTimeout(() => {
      detailsHeading.current?.focus({ preventScroll: true });
    }, reducedMotion ? 0 : 2200);
    return () => window.clearTimeout(focusTimer);
  }, [opened]);

  useEffect(() => {
    if (entered) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('home')?.focus({ preventScroll: true });
    }
  }, [entered]);

  const playMusic = () => {
    const audio = music.current;
    if (!audio) return;
    audio.volume = 0.5;
    void audio.play().catch(() => setMusicPlaying(false));
  };

  const openInvitation = () => {
    playMusic();
    setOpened(true);
  };

  return (
    <>
    <audio
      ref={music}
      src={`/image/newimage/${encodeURIComponent('Elo elo song status #viralvideo #love #lovestatus #shorts.mp3')}`}
      preload="none"
      loop
      onPlay={() => setMusicPlaying(true)}
      onPause={() => setMusicPlaying(false)}
      onError={() => setMusicPlaying(false)}
    />
    {opened && <button
      type="button"
      className="invitation-music-toggle"
      aria-label={musicPlaying ? 'Turn sound off' : 'Turn sound on'}
      title={musicPlaying ? 'Turn sound off' : 'Turn sound on'}
      onClick={() => musicPlaying ? music.current?.pause() : playMusic()}
    >{musicPlaying ? <FiVolume2 aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}</button>}
    {entered ? children : (
    <main className={`invitation-entry${opened ? ' is-open' : ''}`}>
      <div className="entry-heading">
        <span className="eyebrow">A little envelope. A lifetime of love.</span>
        <p>You are warmly invited</p>
      </div>
      <div className="card-stage" ref={cardStage}>
      <div className="folding-card" ref={cardBook}>
        <section className="card-inside" aria-labelledby="card-details-title" inert={!opened}>
          <div className="book-page book-dedication">
            <span className="eyebrow">The beginning of forever</span>
            <span className="book-monogram" aria-hidden="true">A &amp; N</span>
            <span className="book-heart" aria-hidden="true"><FiHeart /></span>
            <p className="book-vow">Two hearts.<br />One promise.<br />A lifetime together.</p>
            <p className="book-dedication-note">With the blessings of our families,<br />and the people we hold dear.</p>
            <span className="book-page-number" aria-hidden="true">01</span>
          </div>
          <div className="book-page book-details">
          <span className="eyebrow">Together with our families</span>
          <h1 id="card-details-title" ref={detailsHeading} tabIndex={-1}>Asib &amp; Nadia</h1>
          <p className="card-invite-copy">With love in our hearts, we invite you to celebrate our wedding.</p>
          <div className="card-date"><span>DECEMBER</span><strong>27</strong><span>PURBA BARDHAMAN</span></div>
          <div className="card-families">
            {people.map((person) => (
              <div key={person.role}>
                <span className="eyebrow">{person.role}</span>
                <h2>{person.name}</h2>
                <p>Beloved {person.role === 'The bride' ? 'daughter' : 'son'} of</p>
                <p className="card-parents">{person.father}<br /><span>&amp;</span><br />{person.mother}</p>
                <p className="card-venue">{person.venue}</p>
              </div>
            ))}
          </div>
          <p className="card-blessing">Your presence and blessings will make our day complete.</p>
          <button className="card-view-button" onClick={() => setEntered(true)}>View Invitation <FiArrowRight aria-hidden="true" /></button>
          <span className="book-page-number" aria-hidden="true">02</span>
          </div>
        </section>
        <button className="card-cover" onClick={openInvitation} aria-label="Open Asib and Nadia's wedding invitation" aria-expanded={opened} aria-controls="card-details-title" tabIndex={opened ? -1 : 0} aria-hidden={opened}>
          <span className="card-cover-border">
            <span className="eyebrow">The wedding invitation</span>
            <span className="card-cover-names">Asib<span>&amp;</span>Nadia</span>
            <span className="card-cover-date">27 · DECEMBER</span>
            <span className="card-seal"><FiHeart aria-hidden="true" /></span>
            <span className="card-open-hint"><FiArrowUp aria-hidden="true" /><strong>Tap to open</strong><span>Click the heart to unfold our invitation</span></span>
          </span>
        </button>
      </div>
      </div>
      <p className="entry-footnote">Two hearts, one beautiful beginning.</p>
    </main>
    )}
    </>
  );
}
