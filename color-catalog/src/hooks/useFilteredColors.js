import { useMemo } from "react";

import { useColors} from "@/stores/useColors";
import { useControls } from "@/stores/useControls";
import { getLuminance } from "@/utils/utils";

export const useFilteredColors = () => {
  const colors = useColors((state) => state.colors);
  const search = useControls((state) => state.search);
  const sort = useControls((state) => state.sort);

  return useMemo(() => {
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
}
