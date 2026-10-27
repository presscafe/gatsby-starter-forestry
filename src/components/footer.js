import React from 'react'
import { Link } from 'gatsby'
import { ArrowUpRight } from 'lucide-react'
import Logo from './logo'
import { navItems } from './header'

const Footer = () => (
  <footer className="site-footer">
    <div className="shell site-footer__top">
      <div className="site-footer__brand">
        <Logo light />
        <h2>News that sees<br />the whole picture.</h2>
        <p>Independent, useful and rooted in Botswana. That’s the BWIRE promise.</p>
      </div>
      <div className="site-footer__links">
        <div>
          <h3>Explore</h3>
          {navItems.slice(0, 4).map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </div>
        <div>
          <h3>More</h3>
          {navItems.slice(4).map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          <Link to="/#briefing">Daily briefing</Link>
        </div>
        <div>
          <h3>BWIRE</h3>
          <Link to="/about/">About us</Link>
          <Link to="/about/#standards">Editorial standards</Link>
          <Link to="/about/#contact">Contact the newsroom</Link>
          <Link to="/saved/">Saved stories</Link>
        </div>
      </div>
    </div>
    <div className="shell site-footer__contact">
      <span>Have a story we should know about?</span>
      <a href="mailto:tips@bwire.co.bw">tips@bwire.co.bw <ArrowUpRight size={18} /></a>
    </div>
    <div className="shell site-footer__bottom">
      <span>© 2026 BWIRE Media. Gaborone, Botswana.</span>
      <div><Link to="/about/#privacy">Privacy</Link><Link to="/about/#terms">Terms</Link><Link to="/about/#corrections">Corrections</Link></div>
      <span>PULA! TO A BETTER-INFORMED BOTSWANA.</span>
    </div>
  </footer>
)

export default Footer
