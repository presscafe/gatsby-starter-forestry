import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import {
  Bookmark,
  ChevronRight,
  CloudSun,
  Headphones,
  Menu,
  Search,
  X,
} from 'lucide-react'
import Logo from './logo'
import SearchOverlay from './search-overlay'

export const navItems = [
  { label: 'Latest', to: '/section/news/' },
  { label: 'Politics', to: '/section/politics/' },
  { label: 'Business', to: '/section/business/' },
  { label: 'Sport', to: '/section/sport/' },
  { label: 'Culture', to: '/section/culture/' },
  { label: 'Technology', to: '/section/technology/' },
  { label: 'Opinion', to: '/section/opinion/' },
]

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  return (
    <>
      <header className="site-header">
        <div className="utility-bar">
          <div className="shell utility-bar__inner">
            <div className="utility-bar__left">
              <span>Tuesday, 27 October 2026</span>
              <span className="utility-weather"><CloudSun size={15} /> Gaborone <strong>28°C</strong></span>
            </div>
            <div className="utility-bar__right">
              <Link to="/about/">Our newsroom</Link>
              <Link to="/saved/"><Bookmark size={13} /> Saved stories</Link>
            </div>
          </div>
        </div>

        <div className="masthead shell">
          <button
            type="button"
            className="mobile-menu-button icon-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={25} />
          </button>
          <Logo strapline />
          <p className="masthead__promise">Independent journalism.<br />For every Motswana.</p>
          <div className="masthead__actions">
            <button type="button" className="masthead__search" onClick={openSearch}>
              <Search size={20} /><span>Search</span>
            </button>
            <Link to="/#briefing" className="button button--dark masthead__briefing">
              <Headphones size={18} /><span>Daily briefing</span>
            </Link>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <div className="shell primary-nav__inner">
            <div className="primary-nav__links">
              {navItems.map(item => (
                <Link key={item.to} to={item.to} activeClassName="is-active">{item.label}</Link>
              ))}
            </div>
            <Link to="/#briefing" className="primary-nav__live"><span /> LISTEN NOW</Link>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="mobile-menu__head">
            <Logo onClick={() => setMenuOpen(false)} />
            <button type="button" className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          <button type="button" className="mobile-menu__search" onClick={openSearch}>
            <Search size={20} /> Search BWIRE
          </button>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item.label}<ChevronRight size={21} />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <Link to="/#briefing" onClick={() => setMenuOpen(false)} className="button button--blue">
              <Headphones size={18} /> Play daily briefing
            </Link>
            <Link to="/saved/" onClick={() => setMenuOpen(false)}>Saved stories</Link>
            <Link to="/about/" onClick={() => setMenuOpen(false)}>About BWIRE</Link>
          </div>
        </div>
      )}
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  )
}

export default Header
