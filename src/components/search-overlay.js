import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { ArrowUpRight, Clock, Search, X } from 'lucide-react'
import articles from '../data/articles.json'

const popularSearches = ['Diamond fund', 'Team Botswana', 'Cybercrime', 'Culture']

const SearchOverlay = ({ open, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current && inputRef.current.focus(), 80)
    const handleKey = event => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  const normalised = query.trim().toLowerCase()
  const results = normalised
    ? articles.filter(article =>
        [article.title, article.excerpt, article.category, article.author]
          .join(' ')
          .toLowerCase()
          .includes(normalised)
      )
    : articles.slice(0, 4)

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search BWIRE">
      <div className="search-overlay__top shell">
        <span className="search-overlay__brand">BWIRE.</span>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close search">
          <X size={25} />
        </button>
      </div>
      <div className="search-overlay__body shell">
        <span className="kicker">SEARCH THE NEWSROOM</span>
        <div className="search-overlay__input-wrap">
          <Search size={30} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="What are you looking for?"
            aria-label="Search stories"
          />
          {query && <button type="button" onClick={() => setQuery('')}>Clear</button>}
        </div>
        {!normalised && (
          <div className="search-overlay__suggestions">
            <span>Popular:</span>
            {popularSearches.map(item => (
              <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>
            ))}
          </div>
        )}
        <div className="search-overlay__results-head">
          <h2>{normalised ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Editor’s picks'}</h2>
          {normalised && <span>for “{query.trim()}”</span>}
        </div>
        <div className="search-overlay__results">
          {results.map(article => (
            <Link
              to={`/news/${article.slug}/`}
              className="search-result"
              key={article.slug}
              onClick={onClose}
            >
              {article.image && <img src={article.image} alt="" />}
              <span className="search-result__copy">
                <small>{article.category}</small>
                <strong>{article.title}</strong>
                <span><Clock size={13} /> {article.readTime} min read · {article.date}</span>
              </span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
          {results.length === 0 && (
            <div className="search-overlay__empty">
              <h3>No stories found.</h3>
              <p>Try a broader term, a topic such as “business”, or one of the popular searches above.</p>
              <button type="button" onClick={() => setQuery('')}>See editor’s picks</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
