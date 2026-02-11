import { useEffect } from "react";

import { Header } from "@/components/Header";
import { Main } from "@/components/Main"
import { CardsList } from "@/components/cards/CardsList";
import { useUI } from "@/stores/useUI";
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
        <CardsList />
      </Main>
    </>
  )
}

export default App
