import { useEffect } from "react";

import { Header } from "@/components/Header.jsx";
import { Main } from "@/components/Main.jsx";
import { CardsList } from "@/components/cards/CardsList.jsx";
import { Controls } from "@/components/controls/Controls.jsx";
import { useUI } from "@/stores/useUI.js";
import "@/styles/variables.css";
import "@/styles/global.css";
import "@/styles/layout.css";

function App() {
  const theme = useUI((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <>
      <Header />
      <Main>
        <Controls />
        <CardsList />
      </Main>
    </>
  )
}

export default App
