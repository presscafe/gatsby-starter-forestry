import React, { useEffect, useState } from 'react'
import { Bookmark } from 'lucide-react'

const STORAGE_KEY = 'bwire-saved'

export const getSavedSlugs = () => {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } catch (error) {
    return []
  }
}

const SaveButton = ({ slug, showLabel = false, className = '' }) => {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const update = () => setSaved(getSavedSlugs().includes(slug))
    update()
    window.addEventListener('bwire-saved-change', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('bwire-saved-change', update)
      window.removeEventListener('storage', update)
    }
  }, [slug])

  const toggleSaved = event => {
    event.preventDefault()
    event.stopPropagation()
    const current = getSavedSlugs()
    const next = current.includes(slug)
      ? current.filter(item => item !== slug)
      : [...current, slug]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setSaved(next.includes(slug))
      window.dispatchEvent(new Event('bwire-saved-change'))
    } catch (error) {
      // Saving is progressive enhancement when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className={`save-button${saved ? ' is-saved' : ''}${
        showLabel ? ' save-button--labelled' : ''
      } ${className}`}
      onClick={toggleSaved}
      aria-label={saved ? 'Remove story from saved stories' : 'Save story'}
      aria-pressed={saved}
      title={saved ? 'Saved' : 'Save for later'}
    >
      <Bookmark size={showLabel ? 17 : 18} fill={saved ? 'currentColor' : 'none'} />
      {showLabel && <span>{saved ? 'Saved' : 'Save story'}</span>}
    </button>
  )
}

export default SaveButton
