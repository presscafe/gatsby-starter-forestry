import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Headphones,
  Share2,
  Square,
} from 'lucide-react'
import Layout from '../components/layout'
import SaveButton from '../components/save-button'
import StoryCard from '../components/story-card'
import Newsletter from '../components/newsletter'

const ArticleTemplate = ({ pageContext }) => {
  const { article, related } = pageContext
  const [copied, setCopied] = useState(false)
  const [listening, setListening] = useState(false)

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [article.slug])

  const share = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (error) {
        if (error.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch (error) {
      setCopied(false)
    }
  }

  const listen = () => {
    if (!('speechSynthesis' in window)) return
    if (listening) {
      window.speechSynthesis.cancel()
      setListening(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(
      `${article.title}. ${article.excerpt}. ${article.body.join(' ')}`
    )
    utterance.rate = 0.97
    utterance.onend = () => setListening(false)
    utterance.onerror = () => setListening(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setListening(true)
  }

  return (
    <Layout>
      <article className="article-page">
        <header className="article-header shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight size={14} />
            <Link to={`/section/${article.section}/`}>{article.category}</Link><ChevronRight size={14} />
            <span>Story</span>
          </nav>
          <div className="article-header__inner">
            <Link to={`/section/${article.section}/`} className="article-header__category">{article.category}</Link>
            <h1>{article.title}</h1>
            <p className="article-header__dek">{article.excerpt}</p>
            <div className="article-header__byline">
              <div className="author-avatar" aria-hidden="true">BW</div>
              <div><strong>{article.author}</strong><span>{article.date} · {article.time} CAT</span></div>
              <span className="article-header__read"><Clock size={15} />{article.readTime} min read</span>
            </div>
            <div className="article-actions">
              <button type="button" onClick={listen} className={listening ? 'is-active' : ''}>
                {listening ? <Square size={16} fill="currentColor" /> : <Headphones size={17} />}
                {listening ? 'Stop listening' : 'Listen to article'}
              </button>
              <SaveButton slug={article.slug} showLabel />
              <button type="button" onClick={share}>
                {copied ? <Check size={17} /> : <Share2 size={17} />}{copied ? 'Link copied' : 'Share'}
              </button>
            </div>
          </div>
        </header>

        {article.image && (
          <figure className="article-hero shell">
            <img src={article.image} alt={article.imageAlt} fetchPriority="high" />
            <figcaption>{article.credit && <>Image: {article.credit}</>}</figcaption>
          </figure>
        )}

        <div className="article-body-layout shell">
          <div className="article-body-layout__rail">
            <span>SHARE THIS STORY</span>
            <button type="button" onClick={share} aria-label="Share this story"><Share2 size={19} /></button>
            <SaveButton slug={article.slug} />
          </div>
          <div className="article-body">
            {article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {article.keyPoints && (
              <aside className="key-points">
                <span className="kicker">THE BWIRE RECAP</span>
                <h2>What you need to know</h2>
                <ul>{article.keyPoints.map(point => <li key={point}>{point}</li>)}</ul>
              </aside>
            )}
            <div className="article-endmark" aria-label="End of article">BW.</div>
            <div className="article-topics">
              <span>Filed under</span>
              <Link to={`/section/${article.section}/`}>{article.category}</Link>
              <Link to="/section/news/">Botswana</Link>
            </div>
          </div>
          <aside className="article-body-layout__aside">
            <span className="kicker">KEEP READING</span>
            <h2>The story doesn’t end here.</h2>
            <p>Get the context behind the headlines in your inbox every weekday.</p>
            <a href="#article-newsletter">The Morning Wire<ArrowRight size={16} /></a>
          </aside>
        </div>
      </article>

      <section className="shell section related-stories" aria-labelledby="related-heading">
        <div className="section-title">
          <div><span className="kicker">MORE FROM BWIRE</span><h2 id="related-heading">Related stories</h2></div>
          <Link to="/"><ArrowLeft size={17} />Back to homepage</Link>
        </div>
        <div className="story-grid story-grid--three">
          {related.map(item => <StoryCard article={item} key={item.slug} />)}
        </div>
      </section>
      <div className="shell home-newsletter" id="article-newsletter"><Newsletter /></div>
    </Layout>
  )
}

export default ArticleTemplate

export const Head = ({ pageContext }) => (
  <>
    <html lang="en" />
    <title>{pageContext.article.title} | BWIRE</title>
    <meta name="description" content={pageContext.article.excerpt} />
    <meta name="theme-color" content="#0c1c27" />
    <meta property="og:title" content={pageContext.article.title} />
    <meta property="og:description" content={pageContext.article.excerpt} />
    <meta property="og:type" content="article" />
    {pageContext.article.image && <meta property="og:image" content={pageContext.article.image} />}
  </>
)
