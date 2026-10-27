import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { ArrowUpRight, Headphones, Play, Square } from 'lucide-react'

const AudioBriefing = ({ stories }) => {
  const [playing, setPlaying] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const toggleBriefing = () => {
    if (!supported) return
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      return
    }

    const script = stories
      .map((story, index) => `Story ${index + 1}. ${story.title}. ${story.excerpt}`)
      .join(' ')
    const utterance = new SpeechSynthesisUtterance(
      `This is your BWIRE news briefing for Tuesday, 27 October. ${script} That is your briefing. Visit BWIRE for the full stories.`
    )
    utterance.rate = 0.98
    utterance.pitch = 1
    utterance.onend = () => setPlaying(false)
    utterance.onerror = () => setPlaying(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setPlaying(true)
  }

  return (
    <section className="briefing" id="briefing" aria-labelledby="briefing-title">
      <div className="briefing__inner shell">
        <div className="briefing__intro">
          <span className="briefing__label"><Headphones size={16} /> THE BWIRE BRIEFING</span>
          <h2 id="briefing-title">Your day.<br /><em>In three minutes.</em></h2>
          <p>The essential headlines, read aloud. No scrolling required.</p>
          <button
            type="button"
            className={`briefing__play${playing ? ' is-playing' : ''}`}
            onClick={toggleBriefing}
            disabled={!supported}
          >
            <span className="briefing__play-icon">
              {playing ? <Square size={20} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </span>
            <span>{playing ? 'Stop briefing' : 'Play today’s briefing'}</span>
            {playing && (
              <span className="equalizer" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            )}
          </button>
          {!supported && <small>Audio playback is not supported in this browser.</small>}
        </div>
        <div className="briefing__queue">
          <div className="briefing__queue-head">
            <span>UP NEXT</span><span>27 OCT 2026</span>
          </div>
          {stories.map((story, index) => (
            <Link to={`/news/${story.slug}/`} className="briefing__story" key={story.slug}>
              <span className="briefing__number">0{index + 1}</span>
              <span>
                <small>{story.category}</small>
                <strong>{story.title}</strong>
              </span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudioBriefing
