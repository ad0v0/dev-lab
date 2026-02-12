import { useControls } from "@/stores/useControls.js";

export const SortControl = () => {
  const sort = useControls((state) => state.sort);
  const setSort = useControls((state) => state.setSort);

  const options = ['none', 'name', 'luminance'];

  return (
    <>
      <label>Sort</label>
      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}</option>
        ))}
      </select>
    </>
  )
}
