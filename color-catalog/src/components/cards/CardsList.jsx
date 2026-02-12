import { useMemo, useEffect } from "react";

import { Card } from "@/components/cards/Card.jsx";
import { useColors } from "@/stores/useColors.js";
import { useControls } from "@/stores/useControls.js";
import { getLuminance } from "@/utils/utils.js";

export const CardsList = () => {
  const colors = useColors((state) => state.colors);
  const fetchColors = useColors((state) => state.fetchColors);
  const baseColor = useControls((state) => state.baseColor);
  const mode = useControls((state) => state.mode);
  const search = useControls((state) => state.search);
  const count = useControls((state) => state.count);
  const sort = useControls((state) => state.sort);

  useEffect(() => {
    fetchColors(baseColor, count, mode)
  }, [fetchColors, baseColor, count, mode])

  const filteredColors = useMemo(() => {
    let filteredColors = [...colors];

    if (search !== '') {
      const normalizedSearch = search.toLowerCase().trim();
      filteredColors = colors.filter((color) =>
        color.name.value.toLowerCase().trim().includes(normalizedSearch) ||
        color.hex.clean.toLowerCase().trim().includes(normalizedSearch)
      );
    }

    if (sort === 'name') {
      filteredColors.sort((prevColor, nextColor) =>
        prevColor.name.value.localeCompare(nextColor.name.value)
      );
    }

    if (sort === 'luminance') {
      filteredColors.sort((prevColor, nextColor) =>
        getLuminance(prevColor.rgb) - getLuminance(nextColor.rgb)
      );
    }

    return filteredColors;
  }, [colors, search, sort])

  return (
    <div className="cards-wrapper">
      <ul className="cards-list">
        {filteredColors.map((color) => (
          <li key={color.hex.value}>
            <Card key={color.hex.value} color={color} />
          </li>
        ))}
      </ul>
    </div>
  )
}