import React, { useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'

const Newsletter = ({ compact = false }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const submit = event => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className={`newsletter newsletter--success${compact ? ' newsletter--compact' : ''}`}>
        <span className="newsletter__success-icon"><Check size={28} /></span>
        <div>
          <h2>You’re on the list.</h2>
          <p>Your first BWIRE morning briefing is on its way. Welcome to better-informed mornings.</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`newsletter${compact ? ' newsletter--compact' : ''}`} aria-labelledby={compact ? undefined : 'newsletter-title'}>
      <div className="newsletter__icon"><Mail size={compact ? 22 : 28} /></div>
      <div className="newsletter__copy">
        <span className="kicker">THE MORNING WIRE</span>
        <h2 id={compact ? undefined : 'newsletter-title'}>Start your day ahead.</h2>
        <p>One sharp email. The stories that matter. Free, every weekday morning.</p>
      </div>
      <form className="newsletter__form" onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor={compact ? 'sidebar-email' : 'footer-email'}>Email address</label>
        <div className="newsletter__input-row">
          <input
            id={compact ? 'sidebar-email' : 'footer-email'}
            type="email"
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder="you@email.com"
            autoComplete="email"
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          />
          <button type="submit" aria-label="Subscribe to the Morning Wire">
            <span>Sign me up</span><ArrowRight size={19} />
          </button>
        </div>
        {status === 'error' ? (
          <span className="newsletter__error" id="newsletter-error" role="alert">Enter a valid email address.</span>
        ) : (
          <span className="newsletter__note">No noise. No spam. Unsubscribe anytime.</span>
        )}
      </form>
    </section>
  )
}

export default Newsletter
