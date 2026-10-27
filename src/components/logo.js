import React from 'react'
import { Link } from 'gatsby'

const Logo = ({ light = false, strapline = false, onClick }) => (
  <Link
    to="/"
    className={`logo${light ? ' logo--light' : ''}`}
    aria-label="BWIRE home"
    onClick={onClick}
  >
    <span className="logo__wordmark">
      BWIRE<span className="logo__dot">.</span>
    </span>
    {strapline && <span className="logo__strapline">BOTSWANA, IN FOCUS.</span>}
  </Link>
)

export default Logo
