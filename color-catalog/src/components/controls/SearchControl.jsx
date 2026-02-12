import { useControls } from "@/stores/useControls.js";

export const SearchControl = () => {
  const search = useControls((state) => state.search);
  const setSearch = useControls((state) => state.setSearch);

  return (
    <>
      <label>Search</label>
      <input
        type="text"
        placeholder="Search color..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </>
  )
}