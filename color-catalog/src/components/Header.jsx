import { useUI } from "@/stores/useUI.js";
import "@/styles/components/header.css"

export const Header = () => {
  const toggleTheme = useUI((state) => state.toggleTheme);
  const theme = useUI((state) => state.theme);

  return (
    <header>
      <h1>Colors catalog</h1>
      <p>Where color meets structure.</p>

      <button onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? (
          <span className="icon-dark">🌙</span>
        ) : (
          <span className="icon-light">☀️</span>
        )}
      </button>
    </header>
  )
}