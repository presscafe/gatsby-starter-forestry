import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { ArrowRight, Bookmark } from 'lucide-react'
import Layout from '../components/layout'
import StoryCard from '../components/story-card'
import { getSavedSlugs } from '../components/save-button'
import articles from '../data/articles.json'

const SavedPage = () => {
  const [saved, setSaved] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const update = () => {
      const slugs = getSavedSlugs()
      setSaved(slugs.map(slug => articles.find(article => article.slug === slug)).filter(Boolean))
      setReady(true)
    }
    update()
    window.addEventListener('bwire-saved-change', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('bwire-saved-change', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  return (
    <Layout>
      <div className="shell saved-page">
        <span className="kicker">YOUR PERSONAL READING LIST</span>
        <h1>Saved stories</h1>
        <p>Keep the reporting that matters to you. Your reading list is stored only on this device.</p>
        {ready && saved.length === 0 && (
          <div className="saved-page__empty">
            <span><Bookmark size={32} /></span>
            <h2>Your reading list is ready when you are.</h2>
            <p>Tap the bookmark on any story and it will be waiting for you here.</p>
            <Link to="/" className="button button--dark">Explore today’s stories<ArrowRight size={18} /></Link>
          </div>
        )}
        {saved.length > 0 && (
          <div className="story-grid story-grid--three saved-page__grid">
            {saved.map(article => <StoryCard article={article} key={article.slug} />)}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SavedPage

export const Head = () => (
  <><html lang="en" /><title>Saved stories | BWIRE</title><meta name="description" content="Your BWIRE reading list." /><meta name="theme-color" content="#0c1c27" /></>
)
