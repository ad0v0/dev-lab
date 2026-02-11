import "@/styles/components/card.css"

export const Card = ({ color }) => {

  return (
    <div className="card">
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