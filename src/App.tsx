import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Field } from "./components/Field";

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
