import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow"

import { Card } from "@/components/cards/Card.jsx";
import { useColors } from "@/stores/useColors.js";
import { useControls } from "@/stores/useControls.js";
import { useFilteredColors } from "@/hooks/useFilteredColors.js";

export const CardsList = () => {
  const fetchColors = useColors((state) => state.fetchColors);

  const { baseColor, mode, count } = useControls(useShallow((state) => ({
    baseColor: state.baseColor,
    mode: state.mode,
    count: state.count
  })));

  const colors = useFilteredColors()

  useEffect(() => {
    fetchColors(baseColor, count, mode)
  }, [fetchColors, baseColor, count, mode])

  return (
    <div className="cards-wrapper">
      <ul className="cards-list">
        {colors.map((color) => (
          <li key={color.hex.value}>
            <Card color={color} />
          </li>
        ))}
      </ul>
    </div>
  )
}