import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Field } from "./components/Field";
import { PlayersChoice } from './pages/PlayersChoice';

export const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <Field />
    </MantineProvider>
  );
};

export default App;
