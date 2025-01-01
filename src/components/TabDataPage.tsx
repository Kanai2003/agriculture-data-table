import { useState } from "react";
import { Tabs, Card } from "@mantine/core";
import { CropProductionExtremesTable } from "./CorpProductionExtremesTable";
import CropYieldAndAreaTable from "./CorpYieldAndAreaTable";
import agriculturalData from "../data/Manufac_India_Agro_Dataset.json";
import { useMediaQuery } from "@mantine/hooks";

const FullPageApplication = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const tabs = [
    {
      key: "yield",
      label: isSmallScreen ? "Yield" : "Crop Yield and Area",
      component: <CropYieldAndAreaTable data={agriculturalData} />,
    },
    {
      key: "extremes",
      label: isSmallScreen ? "Production" : "Crop Production Extremes",
      component: <CropProductionExtremesTable data={agriculturalData} />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const renderTabSection = () => (
    <Card
      shadow="md"
      padding="md"
      radius="md"
      withBorder
      style={{
        width: "fit-content",
        textAlign: "center",
        margin: "20px auto",
        backgroundColor: "#ffffff",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value || tabs[0].key)}
        variant="pills"
        styles={{
          tab: {
            fontSize: isSmallScreen ? "14px" : "16px",
            padding: isSmallScreen ? "8px 16px" : "10px 20px",
          },
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Card>
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f7f9fc",
      }}
    >
      {renderTabSection()}

      {tabs.find((tab) => tab.key === activeTab)?.component}
    </div>
  );
};

export default FullPageApplication;
