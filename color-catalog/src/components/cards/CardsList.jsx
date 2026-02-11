import { useEffect } from "react";

import { Card } from "@/components/cards/Card"
import { useColors } from "@/stores/useColors"

export const CardsList = () => {
  const colors = useColors((state) => state.colors);
  const fetchColors = useColors((state) => state.fetchColors);

  useEffect(() => {
    fetchColors()
  }, [fetchColors])

  return (
    <ul className="cards-list">
      {colors.map((color) => (
        <li key={color.hex.value}>
          <Card key={color.hex.value} color={color} />
        </li>
      ))}
    </ul>
  )
}