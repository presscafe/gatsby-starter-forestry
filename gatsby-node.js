const path = require('path')
const articles = require('./src/data/articles.json')

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve('./src/templates/article.js')
  const sectionTemplate = path.resolve('./src/templates/section.js')

  articles.forEach(article => {
    createPage({
      path: `/news/${article.slug}/`,
      component: articleTemplate,
      context: {
        article,
        related: articles
          .filter(item => item.slug !== article.slug)
          .sort((a, b) => Number(b.section === article.section) - Number(a.section === article.section))
          .slice(0, 3),
      },
    })
  })

  const sections = new Map()
  articles.forEach(article => {
    if (!sections.has(article.section)) {
      sections.set(article.section, {
        name: article.category,
        slug: article.section,
        description: article.sectionDescription,
      })
    }
  })

  sections.forEach((section, slug) => {
    createPage({
      path: `/section/${slug}/`,
      component: sectionTemplate,
      context: {
        section,
        articles: articles.filter(article => article.section === slug),
      },
    })
  })
}
