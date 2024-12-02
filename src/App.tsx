import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { theme } from "./theme";
import { CropProductionExtremesTable } from "./components/CorpProductionExtremesTable";
import CropYieldAndAreaTable from "./components/CorpYieldAndAreaTable";
import agriculturalData from "./data/Manufac_India_Agro_Dataset.json";

export default function App() {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <MantineProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "start",
          justifyContent: "space-evenly",
          padding: 20,
          gap:50
        }}
      >
        <CropProductionExtremesTable data={agriculturalData} />

        <CropYieldAndAreaTable data={agriculturalData} />
      </div>
    </MantineProvider>
  );
}
