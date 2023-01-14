import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Field } from "./components/Field";
import { PlayersChoice } from "./pages/PlayersChoice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { PosibleRoute } from "./store/interfaces";
import { Game } from "./pages/Game";

export const App = () => {
  const { location } = useAppSelector((state) => state.router);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      {location.pathname === PosibleRoute.CHOICE && <PlayersChoice />}
      {location.pathname === PosibleRoute.GAME && <Game />}
    </MantineProvider>
  );
};

export default App;
