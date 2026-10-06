import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const posterAssets = [
  '20-year-old-virgins.webp', '365-days.webp', 'a-good-lawyers-wife.webp', 'american-kamasutra.webp',
  'baby-do-die-do.webp', 'backrooms.webp', 'body-of-night.webp', 'children-of-the-salt.webp',
  'come-undone.webp', 'drawn-together.webp', 'heart-of-the-beast.webp', 'hideout-in-the-sun.webp',
  'homesick-2015.webp', 'hranice-lasky.webp', 'i-love-trouble.webp', 'kamasutra-garden.webp',
  'lotgenoten.webp', 'love-2015.webp', 'loving.webp', 'madrid-1987.webp', 'me-before-you.webp',
  'nude.webp', 'runner-2026.webp', 'salamat-daks.webp', 'sapio.webp', 'sex-weather.webp',
  'singles-2022.webp', 'skin-like-sun.webp', 'taya-2021.webp', 'the-escort-wife.webp',
  'the-kamasutra-garden.webp', 'what-other-couples-do.webp', 'when-the-mist-clears.webp',
  'women-in-the-dark.webp',
].map((filename) => `/assets/movie-posters/${filename}`);
posterAssets.push(posterAssets[0], posterAssets[1]);
const ctaUrls = [
  'https://eatingjudgelos.com/ueiq7tue?key=3199bce6f9c152d9bab772d7cf879cf0',
  'https://eatingjudgelos.com/izgpxyjj?key=3f0d3461e12c63b9522bf5c9f235e514',
  'https://eatingjudgelos.com/yk40evw0td?key=43a52e04f8163d827937e8d5a0cffaed',
];
const adScriptConfigs = {
  desktop: { key: '91955bf1b11f811d00e6a2d4cc9d93f3', width: 728, height: 90 },
  mobile: { key: '966741978a7f6d7d0ef88ed1484108da', width: 320, height: 50 },
  inFeed: { key: 'bac47e72c62ba5cb09bd0cc7395176ee', width: 300, height: 250 },
};
let adScriptQueue = Promise.resolve();

const movieTitles = [
  'Hanuman Ansh', 'Sapio Sexual', 'Now Later', 'Vishwanath', 'Bugso', 'Women in the Dark',
  'Toxic', '20 Year Old Virgins', 'Spider-Man: Brand New Day', '365 Days', 'Mirzapur', 'Children of Salt',
  'The Story of O', 'A Good Lawyer’s Wife', 'Madrid 1987', 'Plank Face', 'Irumudi', 'All Eyes Off Me',
  'Chatbox', 'When the Mist Clears', 'Remember You', 'Crush', 'The Formula', 'Jana Nayagan',
  'Naked Girl', 'Bethlehem Kudumba Unit', 'Hope', 'Kamasutra Garden', 'The Love Hypothesis', 'Sexy Baby',
  'The Last Sunrise', 'American Kamasutra', 'The Beekeeper', 'Frida', 'How to Have Sex', 'Obsession',
];
const movies = movieTitles.map((title, index) => ({
  title,
  poster: posterAssets[index],
  type: 'Movies',
  year: index % 4 === 0 ? '2025' : '2024',
  genre: index % 5 === 0 ? 'Bollywood' : index % 4 === 0 ? 'Drama' : 'RomCom',
  rating: 6 + ((index * 7) % 20) / 10,
  price: index % 3 === 0 ? 'Free' : 'Rent',
  tags: index % 5 === 0 ? ['Bollywood'] : index % 4 === 0 ? ['Epic'] : ['RomCom'],
  free: index % 3 === 0,
  popularity: 100 - index,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  ctaIndex: index % ctaUrls.length,
}));

const providerNames = ['Netflix', 'prime video', 'tv', 'ZEE5', 'MUBI', 'Sony LIV', 'JioCinema', 'Netflix KIDS', 'SUN NXT', 'aha', 'Lionsgate play', 'Discovery+', 'EPIC ON', 'ShemarooMe', 'TATA play'];
const quickTags = ['Studio Ghibli', 'Pixar', 'Claymation', 'Superhero', 'Video Game', 'Disaster', 'Bollywood', 'Epic', 'RomCom', 'Action Comedy', 'Horror Comedy', 'Holiday', 'Musical', 'Based On A True Story'];
const filters = [
  { key: 'year', label: 'Release year', options: ['2025', '2024', '2023', '2022'] },
  { key: 'genre', label: 'Genres', options: ['Action Comedy', 'Bollywood', 'Drama', 'Horror Comedy', 'Musical', 'RomCom', 'Superhero'] },
  { key: 'price', label: 'Price', options: ['Free', 'Rent'] },
  { key: 'rating', label: 'Rating', options: ['8+', '7+', '6+'] },
  { key: 'age', label: 'Age rating', options: ['12+', '16+', '18+'] },
];

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" /><path d="m16 16 5 5" /></svg>;
}
function MenuIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
}
function ChevronDown() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
}
function BookmarkIcon({ filled = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'bookmark-filled' : ''}><path d="M6.5 4.5A2.5 2.5 0 0 1 9 2h6a2.5 2.5 0 0 1 2.5 2.5V21L12 17.8 6.5 21z" /></svg>;
}
function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>;
}

function ProviderRail() {
  return (
    <div className="provider-rail" aria-label="Streaming services">
      <div className="provider-scroll">
        {providerNames.map((provider, index) => (
          <div className={`provider provider-${index}`} key={provider} title={provider}>
            <span>{provider}</span>
          </div>
        ))}
      </div>
      <button className="rail-arrow" aria-label="Show more streaming services"><ArrowIcon /></button>
    </div>
  );
}

function FilterSelect({ label, options, value, onChange }) {
  return (
    <label className="filter-select">
      <span className="sr-only">{label}</span>
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{label}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <ChevronDown />
    </label>
  );
}

function AdsterraBanner({ placement }) {
  const slotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  const config = placement === 'inFeed'
    ? adScriptConfigs.inFeed
    : isMobile ? adScriptConfigs.mobile : adScriptConfigs.desktop;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateViewport = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return undefined;

    let cancelled = false;
    adScriptQueue = adScriptQueue.then(() => new Promise((resolve) => {
      if (cancelled || !slot.isConnected) {
        resolve();
        return;
      }

      window.atOptions = {
        key: config.key,
        format: 'iframe',
        height: config.height,
        width: config.width,
        params: {},
      };

      const script = document.createElement('script');
      script.src = `https://eatingjudgelos.com/${config.key}/invoke.js`;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => {
        console.error(`Adsterra banner failed to load (${config.width}x${config.height}).`);
        resolve();
      };
      slot.appendChild(script);
    })).catch((error) => {
      console.error('Adsterra banner could not be initialized.', error);
    });

    return () => {
      cancelled = true;
      slot.replaceChildren();
    };
  }, [config]);

  return (
    <aside className={`ad-slot ${placement === 'inFeed' ? 'ad-slot--in-feed' : 'ad-slot--top'}`} aria-label="Advertisement">
      <span className="ad-slot-label">Advertisement</span>
      <div
        className="ad-slot-frame"
        ref={slotRef}
        style={{ width: config.width, height: config.height }}
      />
    </aside>
  );
}

function ExitAdPopup({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      className="exit-ad-dialog"
      ref={dialogRef}
      aria-labelledby="exit-ad-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <button className="exit-ad-close" type="button" aria-label="Close advertisement" onClick={() => dialogRef.current?.close()}>
        ×
      </button>
      <h2 id="exit-ad-title">Before you go</h2>
      <p className="exit-ad-copy">Sponsored message</p>
      <AdsterraBanner placement="inFeed" />
    </dialog>
  );
}

function MovieCard({ movie, isSaved, onToggleSaved }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <a className="poster-link" href={ctaUrls[movie.ctaIndex]} target="_blank" rel="noreferrer" aria-label={`Watch ${movie.title}`}>
          <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />
        </a>
        {movie.free && <span className="free-badge">Free</span>}
        <button className={`bookmark-button ${isSaved ? 'is-saved' : ''}`} aria-label={`${isSaved ? 'Remove' : 'Save'} ${movie.title} to list`} onClick={() => onToggleSaved(movie.slug)}>
          <BookmarkIcon filled={isSaved} />
        </button>
      </div>
    </article>
  );
}

function App() {
  const [tab, setTab] = useState('Movies');
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState({ year: '', genre: '', price: '', rating: '', age: '' });
  const [activeTags, setActiveTags] = useState([]);
  const [sort, setSort] = useState('Popularity');
  const [visibleCount, setVisibleCount] = useState(24);
  const [saved, setSaved] = useState([]);
  const [isExitAdOpen, setIsExitAdOpen] = useState(false);
  const exitAdTriggered = useRef(false);

  useEffect(() => {
    const canDetectExitIntent = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canDetectExitIntent) return undefined;

    const handleMouseOut = (event) => {
      if (event.relatedTarget !== null || event.clientY > 0 || exitAdTriggered.current) return;

      exitAdTriggered.current = true;
      setIsExitAdOpen(true);
    };

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, []);

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();
    let output = movies.filter((movie) => {
      const matchesTab = tab === 'All' || movie.type === tab;
      const matchesSearch = !query || `${movie.title} ${movie.genre} ${movie.tags.join(' ')}`.toLowerCase().includes(query);
      const matchesYear = !filterValues.year || movie.year === filterValues.year;
      const matchesGenre = !filterValues.genre || movie.genre === filterValues.genre;
      const matchesPrice = !filterValues.price || movie.price === filterValues.price;
      const minRating = filterValues.rating ? Number(filterValues.rating.replace('+', '')) : 0;
      const matchesRating = !minRating || movie.rating >= minRating;
      const matchesTags = activeTags.length === 0 || activeTags.some((tag) => movie.tags.includes(tag));
      return matchesTab && matchesSearch && matchesYear && matchesGenre && matchesPrice && matchesRating && matchesTags;
    });
    if (sort === 'Rating') output = [...output].sort((a, b) => b.rating - a.rating);
    if (sort === 'Newest') output = [...output].sort((a, b) => b.year.localeCompare(a.year));
    if (sort === 'Popularity') output = [...output].sort((a, b) => b.popularity - a.popularity);
    return output;
  }, [activeTags, filterValues, search, sort, tab]);

  const resetAll = () => {
    setTab('Movies');
    setSearch('');
    setFilterValues({ year: '', genre: '', price: '', rating: '', age: '' });
    setActiveTags([]);
    setSort('Popularity');
    setVisibleCount(24);
  };

  const setFilter = (key, value) => {
    setFilterValues((current) => ({ ...current, [key]: value }));
    setVisibleCount(24);
  };

  const toggleTag = (tag) => {
    setActiveTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
    setVisibleCount(24);
  };

  const toggleSaved = (slug) => setSaved((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="MovieWatch home"><img src="/assets/moviewatch-logo.svg" alt="MovieWatch" /></a>
          <nav className="main-nav" aria-label="Primary navigation">
            {['Home', 'New', 'Popular', 'Lists', 'Sports', 'Guide'].map((item) => <a className={item === 'Popular' ? 'active' : ''} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
          </nav>
          <label className="search-box">
            <SearchIcon />
            <span className="sr-only">Search for movies or TV shows</span>
            <input value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(24); }} placeholder="Search for movies or TV shows" />
            {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}>×</button>}
          </label>
          <button className="signin-button">Sign In</button>
          <button className="menu-button" aria-label="Open menu"><MenuIcon /></button>
        </div>
      </header>

      <main id="top" className="content-shell">
        <section className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">MOVIE GUIDE · INDIA</p>
            <h1 id="page-title">Stream movies online</h1>
            <p>Need help deciding what to watch before your popcorn runs out? We’ve got you covered! With this guide, you can find the best movies to watch online across all languages, eras, and genres—all in one place. From discovering where to watch films for free to keeping track of new releases, our easy-to-use guide is your go-to hub for all things movies.</p>
          </div>
          <ProviderRail />
        </section>

        <AdsterraBanner placement="top" />

        <section className="catalog-section" aria-label="Movie catalog">
          <div className="catalog-toolbar">
            <div className="tabs" role="tablist" aria-label="Content type">
              {['All', 'Movies', 'TV Shows'].map((item) => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'active' : ''} onClick={() => { setTab(item); setVisibleCount(24); }}>{item}</button>)}
            </div>
            <div className="filter-caption"><span className="funnel-mark">⌄</span> FILTERS</div>
            <div className="filters-row">
              {filters.map((filter) => <FilterSelect key={filter.key} label={filter.label} options={filter.options} value={filterValues[filter.key]} onChange={(value) => setFilter(filter.key, value)} />)}
            </div>
            <button className="reset-button" aria-label="X RESET" onClick={resetAll}><span>×</span> RESET</button>
          </div>

          <div className="result-row">
            <p><strong>{search || activeTags.length || Object.values(filterValues).some(Boolean) ? filteredMovies.length : '49,794'}</strong> titles <span>sorted by</span></p>
            <label className="sort-select"><select aria-label="Sort titles" value={sort} onChange={(event) => setSort(event.target.value)}><option>Popularity</option><option>Rating</option><option>Newest</option></select><ChevronDown /></label>
          </div>

          <div className="quick-tags" aria-label="Quick category filters">
            {quickTags.map((tag) => <button key={tag} className={activeTags.includes(tag) ? 'active' : ''} onClick={() => toggleTag(tag)}>{tag}</button>)}
          </div>

          {filteredMovies.length > 0 ? <div className="movie-grid">
            {filteredMovies.slice(0, visibleCount).map((movie, index) => (
              <React.Fragment key={`${movie.slug}-${movie.type}`}>
                <MovieCard movie={movie} isSaved={saved.includes(movie.slug)} onToggleSaved={toggleSaved} />
                {index === 11 && filteredMovies.length > 12 && (
                  <div className="ad-grid-item">
                    <AdsterraBanner placement="inFeed" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div> : <div className="empty-state"><span className="empty-icon">⌕</span><h2>No titles found</h2><p>Try removing a filter or searching for another movie.</p><button onClick={resetAll}>Reset all filters</button></div>}

          {filteredMovies.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 12)}>See More <span>↓</span></button>}
          {filteredMovies.length > 0 && filteredMovies.length <= visibleCount && <a className="load-more external-load-more" href={ctaUrls[0]} target="_blank" rel="noreferrer">Load More <span className="loading-dots" aria-hidden="true"><i></i><i></i><i></i></span></a>}
        </section>
      </main>

      <button className="floating-help" aria-label="Open MovieWatch help"><span></span><span></span><span></span></button>
      <ExitAdPopup isOpen={isExitAdOpen} onClose={() => setIsExitAdOpen(false)} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
