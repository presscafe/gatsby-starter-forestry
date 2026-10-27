import React from 'react'
import { Link } from 'gatsby'
import { ArrowRight, ChevronRight, Clock } from 'lucide-react'
import Layout from '../components/layout'
import StoryCard from '../components/story-card'
import Newsletter from '../components/newsletter'

const SectionTemplate = ({ pageContext }) => {
  const { section, articles } = pageContext
  const [lead, ...rest] = articles

  return (
    <Layout>
      <div className="shell section-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight size={14} /><span>{section.name}</span>
        </nav>
        <header className="section-page__header">
          <span className="kicker">BWIRE / {section.slug.toUpperCase()}</span>
          <h1>{section.name}</h1>
          <p>{section.description}</p>
          <span>{articles.length} stor{articles.length === 1 ? 'y' : 'ies'} in this section</span>
        </header>

        <article className="section-lead">
          <Link to={`/news/${lead.slug}/`} className="section-lead__image">
            <img src={lead.image} alt={lead.imageAlt} fetchPriority="high" />
          </Link>
          <div className="section-lead__copy">
            <span className="kicker">LATEST IN {section.name.toUpperCase()}</span>
            <h2><Link to={`/news/${lead.slug}/`}>{lead.title}</Link></h2>
            <p>{lead.excerpt}</p>
            <div><span>{lead.author}</span><span><Clock size={14} />{lead.readTime} min read</span></div>
            <Link to={`/news/${lead.slug}/`} className="text-link">Read full story<ArrowRight size={18} /></Link>
          </div>
        </article>

        {rest.length > 0 && (
          <div className="section-page__grid story-grid story-grid--three">
            {rest.map(article => <StoryCard article={article} key={article.slug} />)}
          </div>
        )}
      </div>
      <div className="shell home-newsletter"><Newsletter /></div>
    </Layout>
  )
}

export default SectionTemplate

export const Head = ({ pageContext }) => (
  <>
    <html lang="en" />
    <title>{pageContext.section.name} | BWIRE</title>
    <meta name="description" content={pageContext.section.description} />
    <meta name="theme-color" content="#0c1c27" />
  </>
)
