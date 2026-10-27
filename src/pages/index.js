import React, { useState } from 'react'
import { Link } from 'gatsby'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Trophy,
} from 'lucide-react'
import Layout from '../components/layout'
import StoryCard from '../components/story-card'
import AudioBriefing from '../components/audio-briefing'
import Newsletter from '../components/newsletter'
import articles from '../data/articles.json'

const bySlug = slug => articles.find(article => article.slug === slug)

const breakingStories = [
  {
    label: 'DEVELOPING',
    title: 'Dr Moeti honoured for contribution to public health across Africa',
    slug: 'dr-moeti-public-health-honour',
  },
  {
    label: 'NATIONAL',
    title: 'Cybercrime awareness campaign puts prevention first',
    slug: 'cybercrime-awareness-mochudi',
  },
  {
    label: 'BUSINESS',
    title: 'P1 billion diamond fund moves into implementation phase',
    slug: 'diamond-fund-implementation',
  },
]

const league = [
  { position: 1, team: 'Gaborone United', played: 5, gd: '+8', points: 15 },
  { position: 2, team: 'Tonota FC', played: 6, gd: '+6', points: 14 },
  { position: 3, team: 'Sua Flamingoes', played: 6, gd: '+2', points: 11 },
  { position: 4, team: 'Mochudi Centre Chiefs', played: 7, gd: '0', points: 10 },
  { position: 5, team: 'Jwaneng Galaxy', played: 4, gd: '+7', points: 9 },
  { position: 6, team: 'Orapa United', played: 7, gd: '+1', points: 9 },
]

const SectionTitle = ({ eyebrow, title, link, linkLabel = 'View all' }) => (
  <div className="section-title">
    <div>
      {eyebrow && <span className="kicker">{eyebrow}</span>}
      <h2>{title}</h2>
    </div>
    {link && <Link to={link}>{linkLabel}<ArrowRight size={18} /></Link>}
  </div>
)

const BreakingBar = () => {
  const [active, setActive] = useState(0)
  const story = breakingStories[active]
  const change = direction => {
    setActive(current => (current + direction + breakingStories.length) % breakingStories.length)
  }

  return (
    <div className="breaking-bar">
      <div className="shell breaking-bar__inner">
        <span className="breaking-bar__label"><i />{story.label}</span>
        <Link to={`/news/${story.slug}/`} aria-live="polite">
          <span>{story.title}</span><ArrowUpRight size={17} />
        </Link>
        <div className="breaking-bar__controls">
          <button type="button" onClick={() => change(-1)} aria-label="Previous headline"><ChevronLeft size={17} /></button>
          <span>{active + 1} / {breakingStories.length}</span>
          <button type="button" onClick={() => change(1)} aria-label="Next headline"><ChevronRight size={17} /></button>
        </div>
      </div>
    </div>
  )
}

const HomePage = () => {
  const [moreCount, setMoreCount] = useState(3)
  const lead = bySlug('diamond-fund-implementation')
  const latest = [
    'dr-moeti-public-health-honour',
    'cybercrime-awareness-mochudi',
    'bnf-economic-emancipation',
    'botswana-media-reforms',
    'malaria-elimination-council',
  ].map(bySlug)
  const topStories = [
    'dr-moeti-public-health-honour',
    'digital-skills-opportunity',
    'economy-revival-collective-effort',
  ].map(bySlug)
  const moreStories = [
    'bnf-economic-emancipation',
    'botswana-media-reforms',
    'malaria-elimination-council',
    'tebogo-marathon-cancer-awareness',
    'dithubaruba-living-heritage',
  ].map(bySlug)
  const mostRead = [
    'diamond-fund-implementation',
    'dr-moeti-public-health-honour',
    'diamonds-next-chapter-opinion',
    'team-botswana-relay-repechage',
    'bnf-economic-emancipation',
  ].map(bySlug)
  const briefingStories = [
    'dr-moeti-public-health-honour',
    'diamond-fund-implementation',
    'cybercrime-awareness-mochudi',
    'team-botswana-relay-repechage',
  ].map(bySlug)
  const opinion = bySlug('diamonds-next-chapter-opinion')
  const sport = bySlug('team-botswana-relay-repechage')
  const culture = ['dithubaruba-living-heritage', 'domboshaba-festival-generations'].map(bySlug)

  return (
    <Layout>
      <BreakingBar />

      <div className="shell home-hero">
        <article className="lead-story">
          <Link to={`/news/${lead.slug}/`} className="lead-story__image-link">
            <img src={lead.image} alt={lead.imageAlt} className="lead-story__image" fetchPriority="high" />
            <span className="lead-story__badge">THE BIG STORY</span>
            <span className="lead-story__credit">{lead.credit}</span>
          </Link>
          <div className="lead-story__content">
            <div className="story-meta">
              <Link to="/section/business/">{lead.category}</Link>
              <span><Clock size={14} /> {lead.readTime} min read</span>
            </div>
            <h1><Link to={`/news/${lead.slug}/`}>{lead.title}</Link></h1>
            <p>{lead.excerpt}</p>
            <div className="byline">
              <span>By <strong>{lead.author}</strong></span><i />
              <span>{lead.date}</span>
            </div>
          </div>
        </article>

        <aside className="latest-rail" aria-labelledby="latest-heading">
          <div className="latest-rail__head">
            <h2 id="latest-heading"><span />THE LATEST</h2>
            <span>UPDATED NOW</span>
          </div>
          <div className="latest-rail__list">
            {latest.map((article, index) => (
              <article className="latest-item" key={article.slug}>
                <div className="latest-item__time">
                  <span>{article.time}</span>
                  <small>{index < 2 ? 'TODAY' : article.date.split(' ').slice(0, 2).join(' ').toUpperCase()}</small>
                </div>
                <div>
                  <Link to={`/section/${article.section}/`} className="latest-item__category">{article.category}</Link>
                  <h3><Link to={`/news/${article.slug}/`}>{article.title}</Link></h3>
                </div>
              </article>
            ))}
          </div>
          <Link to="/section/news/" className="latest-rail__all">All the latest news<ArrowRight size={17} /></Link>
        </aside>
      </div>

      <section className="shell section top-stories" aria-labelledby="top-stories-heading">
        <SectionTitle eyebrow="CURATED BY OUR NEWSROOM" title="Top stories" link="/section/news/" />
        <div className="story-grid story-grid--three">
          {topStories.map(article => <StoryCard article={article} key={article.slug} />)}
        </div>
      </section>

      <AudioBriefing stories={briefingStories} />

      <section className="shell section news-and-reads">
        <div className="more-news">
          <SectionTitle eyebrow="STAY UP TO DATE" title="More from Botswana" link="/section/news/" />
          <div className="more-news__list">
            {moreStories.slice(0, moreCount).map(article => (
              <StoryCard article={article} variant="horizontal" key={article.slug} />
            ))}
          </div>
          {moreCount < moreStories.length && (
            <button type="button" className="load-more" onClick={() => setMoreCount(moreStories.length)}>
              Show more stories <ArrowRight size={17} />
            </button>
          )}
        </div>
        <aside className="most-read" aria-labelledby="most-read-title">
          <div className="most-read__head">
            <span className="kicker">WHAT BATSWANA ARE READING</span>
            <h2 id="most-read-title">Most read</h2>
          </div>
          <ol>
            {mostRead.map((article, index) => (
              <li key={article.slug}>
                <span className="most-read__number">{index + 1}</span>
                <div>
                  <small>{article.category}</small>
                  <h3><Link to={`/news/${article.slug}/`}>{article.title}</Link></h3>
                </div>
              </li>
            ))}
          </ol>
          <div className="most-read__briefing">
            <Headphones size={23} />
            <div><strong>Prefer to listen?</strong><span>Your top stories, read aloud.</span></div>
            <a href="#briefing" aria-label="Go to the audio briefing"><ArrowUpRight size={19} /></a>
          </div>
        </aside>
      </section>

      <section className="shell section opinion-feature" aria-labelledby="opinion-heading">
        <Link to={`/news/${opinion.slug}/`} className="opinion-feature__image">
          <img src={opinion.image} alt={opinion.imageAlt} loading="lazy" />
          <span>THE LONG VIEW</span>
        </Link>
        <div className="opinion-feature__content">
          <span className="kicker">OPINION · BWIRE EDITORIAL</span>
          <h2 id="opinion-heading"><Link to={`/news/${opinion.slug}/`}>{opinion.title}</Link></h2>
          <p>{opinion.excerpt}</p>
          <Link to={`/news/${opinion.slug}/`} className="text-link">Read the editorial<ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="sport-section section" aria-labelledby="sport-heading">
        <div className="shell">
          <SectionTitle eyebrow="THE FIELD. THE TRACK. THE NATION." title="Sport" link="/section/sport/" />
          <div className="sport-layout">
            <StoryCard article={sport} variant="sport" />
            <div className="league-card">
              <div className="league-card__head">
                <div><Trophy size={21} /><span>BOTSWANA PREMIER LEAGUE</span></div>
                <small>2026/27 · WEEK 6</small>
              </div>
              <table>
                <caption className="sr-only">Botswana Premier League standings</caption>
                <thead><tr><th scope="col">#</th><th scope="col">Team</th><th scope="col">P</th><th scope="col">GD</th><th scope="col">Pts</th></tr></thead>
                <tbody>
                  {league.map(row => (
                    <tr key={row.team}>
                      <td><span className={`league-position${row.position < 3 ? ' is-top' : ''}`}>{row.position}</span></td>
                      <th scope="row">{row.team}</th><td>{row.played}</td><td>{row.gd}</td><td><strong>{row.points}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link to="/section/sport/" className="league-card__footer">Full table & fixtures<ArrowRight size={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section culture-section" aria-labelledby="culture-heading">
        <SectionTitle eyebrow="OUR STORIES. OUR SOUND. OUR SOUL." title="Culture & life" link="/section/culture/" />
        <div className="story-grid story-grid--two">
          {culture.map(article => <StoryCard article={article} key={article.slug} />)}
        </div>
      </section>

      <div className="shell home-newsletter">
        <Newsletter />
      </div>
    </Layout>
  )
}

export default HomePage

export const Head = () => (
  <>
    <html lang="en" />
    <title>BWIRE — Botswana, in focus</title>
    <meta name="description" content="Botswana’s digital-first newsroom. National news, business, sport, culture and the stories that matter — clearly reported, all in one place." />
    <meta name="theme-color" content="#0c1c27" />
    <meta property="og:title" content="BWIRE — Botswana, in focus" />
    <meta property="og:description" content="Independent journalism for every Motswana." />
    <meta property="og:type" content="website" />
  </>
)
