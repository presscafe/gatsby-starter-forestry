import React from 'react'
import { Link } from 'gatsby'
import { ArrowRight } from 'lucide-react'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <div className="shell not-found">
      <span className="not-found__code">404</span>
      <span className="kicker">OFF THE WIRE</span>
      <h1>This story has moved.<br />Let’s get you back on track.</h1>
      <p>The page you’re looking for doesn’t exist, but there’s plenty more happening across Botswana.</p>
      <Link to="/" className="button button--dark">Back to the homepage<ArrowRight size={18} /></Link>
    </div>
  </Layout>
)

export default NotFoundPage

export const Head = () => <><html lang="en" /><title>Page not found | BWIRE</title><meta name="theme-color" content="#0c1c27" /></>
