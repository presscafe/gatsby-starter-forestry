import React from 'react'
import { Link } from 'gatsby'
import { ArrowUpRight } from 'lucide-react'
import SaveButton from './save-button'

const StoryCard = ({ article, variant = 'standard', eager = false, showImage = true }) => {
  const storyUrl = `/news/${article.slug}/`

  return (
    <article className={`story-card story-card--${variant}`}>
      {showImage && article.image && (
        <Link to={storyUrl} className="story-card__image-link" tabIndex={-1} aria-hidden="true">
          <img
            src={article.image}
            alt=""
            className="story-card__image"
            loading={eager ? 'eager' : 'lazy'}
          />
          <span className="story-card__image-arrow">
            <ArrowUpRight size={19} />
          </span>
        </Link>
      )}
      <div className="story-card__content">
        <div className="story-card__eyebrow">
          <Link to={`/section/${article.section}/`}>{article.category}</Link>
          <span>{article.readTime} min read</span>
        </div>
        <h3 className="story-card__title">
          <Link to={storyUrl}>{article.title}</Link>
        </h3>
        {variant !== 'compact' && <p className="story-card__excerpt">{article.excerpt}</p>}
        <div className="story-card__footer">
          <span>{article.date}</span>
          <SaveButton slug={article.slug} />
        </div>
      </div>
    </article>
  )
}

export default StoryCard
