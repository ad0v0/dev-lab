import { useControls } from "@/stores/useControls.js";

export const BaseColorControl = () => {
  const baseColor = useControls((state) => state.baseColor);
  const setBaseColor = useControls((state) => state.setBaseColor);

  return (
    <>
      <label htmlFor="base-color">Base Color</label>
      <input
        id="base-color"
        type="color"
        value={baseColor}
        onChange={(event) => setBaseColor(event.target.value)}
      />
    </>
  )
}