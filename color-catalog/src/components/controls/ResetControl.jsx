import { useControls } from "@/stores/useControls.js";

export const ResetControl = () => {
  const resetControls = useControls((state) => state.resetControls);

  return (
    <button className="reset-btn" onClick={resetControls}>
      Reset
    </button>
  )
}