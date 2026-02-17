import { useEffect, useState } from "react";

import { useControls } from "@/stores/useControls.js";
import { useDebounce } from "@/hooks/useDebounce.js";

export const SearchControl = () => {
  const search = useControls((state) => state.search);
  const setSearch = useControls((state) => state.setSearch);

  const [value, setValue] = useState(search);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    setSearch(debouncedValue)
  }, [setSearch, debouncedValue])

  return (
    <>
      <label>Search</label>
      <input
        type="text"
        placeholder="Search color..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  )
}
