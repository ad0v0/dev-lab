import { useEffect } from "react";

import { Card } from "@/components/cards/Card.jsx";
import { useColors } from "@/stores/useColors.js";
import { useControls } from "@/stores/useControls.js";
import { useFilteredColors } from "@/hooks/useFilteredColors.js";

export const CardsList = () => {
  const fetchColors = useColors((state) => state.fetchColors);
  const baseColor = useControls((state) => state.baseColor);
  const mode = useControls((state) => state.mode);
  const count = useControls((state) => state.count);

  const colors = useFilteredColors()

  useEffect(() => {
    fetchColors(baseColor, count, mode)
  }, [fetchColors, baseColor, count, mode])

  return (
    <div className="cards-wrapper">
      <ul className="cards-list">
        {colors.map((color) => (
          <li key={color.hex.value}>
            <Card key={color.hex.value} color={color} />
          </li>
        ))}
      </ul>
    </div>
  )
}