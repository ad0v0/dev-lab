import { useRef, useEffect, useState, memo } from 'react'

import "@/styles/components/card.css"

export const Card = memo(({ color }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isColorCopied, setColorCopied] = useState(false);

  const handleCopyColor = async () => {
    try {
      await navigator.clipboard.writeText(color.hex.value);
      setColorCopied(true);

      setTimeout(() => {
        setColorCopied(false);
      }, 1500)
    } catch (error) {
      console.error('Failed to copy color due to:', error)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [])

  return (
    <div
      ref={ref}
      className={`card ${visible ? "card-visible" : ""}`}
    >
      <div
        className="card-color-preview"
        style={{
          backgroundColor: `${color.hex.value}`,
        }}
      />

      <div className="card-footer">
        <div>
          <h3 className="card-title">{color.hex.value}</h3>
          <p className="card-meta">{color.name.value}</p>
        </div>

        <button onClick={handleCopyColor} className={`copy-btn ${isColorCopied ? 'copied' : ''}`}>
          {isColorCopied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
});