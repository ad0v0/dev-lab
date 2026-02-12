import { useControls } from "@/stores/useControls.js";

export const LimitControl = () => {
  const count = useControls((state) => state.count);
  const setCount = useControls((state) => state.setCount);

  const options = [4, 6, 8, 12, 20];

  return (
    <>
      <label>Amount</label>
      <select value={count} onChange={(event) => setCount(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  )
}