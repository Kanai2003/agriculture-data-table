import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import FullPageApplication from "./components/TabDataPage";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <FullPageApplication />
    </MantineProvider>
  );
}
