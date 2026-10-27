import React from 'react'
import { Link } from 'gatsby'
import { ArrowRight, Eye, Lightbulb, MapPin, Scale } from 'lucide-react'
import Layout from '../components/layout'
import Newsletter from '../components/newsletter'

const AboutPage = () => (
  <Layout>
    <div className="about-page">
      <header className="shell about-hero">
        <span className="kicker">THIS IS BWIRE</span>
        <h1>Botswana has a story.<br /><em>We’re here to tell it well.</em></h1>
        <p>BWIRE is a digital-first newsroom built around a simple idea: the news should make your world clearer, not louder.</p>
      </header>
      <div className="shell about-values">
        <article><Eye size={25} /><h2>See the whole picture</h2><p>We go beyond the announcement to explain what decisions mean for people, communities and the country.</p></article>
        <article><Scale size={25} /><h2>Earn trust daily</h2><p>We separate fact from opinion, name our sources and correct mistakes openly. Credibility is our most important asset.</p></article>
        <article><Lightbulb size={25} /><h2>Make news useful</h2><p>Clear language, thoughtful context and accessible formats help more people take part in national conversations.</p></article>
      </div>
      <div className="shell about-details">
        <section id="standards"><span className="kicker">OUR STANDARDS</span><h2>Independent in spirit.<br />Accountable in practice.</h2><p>Our editorial decisions are made in the public interest. We strive for accuracy, fairness and meaningful context, and we give people a fair opportunity to respond to claims made about them.</p><p>Analysis and opinion are clearly labelled. Commercial relationships do not determine our news agenda.</p></section>
        <aside id="contact"><MapPin size={24} /><span className="kicker">FIND US</span><h2>Gaborone,<br />Botswana.</h2><p>Have a tip, question or correction?</p><a href="mailto:tips@bwire.co.bw">tips@bwire.co.bw<ArrowRight size={17} /></a><a href="mailto:hello@bwire.co.bw">hello@bwire.co.bw<ArrowRight size={17} /></a></aside>
      </div>
      <div className="shell about-policies">
        <section id="corrections"><h2>Corrections</h2><p>When we get something wrong, we want to put it right. Email corrections@bwire.co.bw with the story link and the detail in question.</p></section>
        <section id="privacy"><h2>Privacy</h2><p>Saved stories remain in your browser’s local storage. This editorial concept does not send your reading list to a server.</p></section>
        <section id="terms"><h2>Terms</h2><p>BWIRE’s editorial content is presented for information. Reproduction should acknowledge BWIRE and preserve the original context.</p></section>
      </div>
      <div className="shell about-cta"><h2>Better news starts here.</h2><Link to="/">Read today’s BWIRE<ArrowRight size={19} /></Link></div>
    </div>
    <div className="shell home-newsletter"><Newsletter /></div>
  </Layout>
)

export default AboutPage

export const Head = () => (
  <><html lang="en" /><title>About our newsroom | BWIRE</title><meta name="description" content="Meet BWIRE: independent, useful journalism rooted in Botswana." /><meta name="theme-color" content="#0c1c27" /></>
)
