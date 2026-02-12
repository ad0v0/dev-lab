import { useControls } from "@/stores/useControls.js";

export const ModeControl = () => {
  const mode = useControls((state) => state.mode);
  const setMode = useControls((state) => state.setMode);

  const options = ['Analogic', 'Monochrome', 'Triad', 'Complement'];

  return (
    <>
      <label>Mode</label>
      <select value={mode} onChange={(event) => setMode(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  )
}