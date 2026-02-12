import { useRef, useEffect, useState } from 'react'

import "@/styles/components/card.css"

export const Card = ({ color }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

      <h3 className="card-title">{color.hex.value}</h3>
      <p className="card-meta">{color.name.value}</p>
    </div>
  )
}