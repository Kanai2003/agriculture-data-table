"ues client";
import React, { useMemo } from "react";
import { Table, Card, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AgriculturalData } from "../type/type";
import CropProductionExtremesChart from "./CorpProductionChart";

export const CropProductionExtremesTable: React.FC<{
  data: AgriculturalData[];
}> = ({ data }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const processedData = useMemo(() => {
    const yearlyProductionData = data.reduce((acc, item) => {
      const year = item.Year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {} as Record<string, AgriculturalData[]>);

    return Object.entries(yearlyProductionData).map(([year, yearData]) => {
      const maxProductionCrop = yearData.reduce((max, crop) =>
        crop["Crop Production (UOM:t(Tonnes))"] >
        max["Crop Production (UOM:t(Tonnes))"]
          ? crop
          : max
      );

      const minProductionCrop = yearData.reduce((min, crop) =>
        crop["Crop Production (UOM:t(Tonnes))"] <
        min["Crop Production (UOM:t(Tonnes))"]
          ? crop
          : min
      );

      return {
        year,
        maxCrop: maxProductionCrop["Crop Name"],
        minCrop: minProductionCrop["Crop Name"],
      };
    });
  }, [data]);

  const rows = processedData.map((item, index) => (
    <tr
      key={item.year}
      style={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e7ff",
        borderBottom: "1px solid #ccc",
      }}
    >
      <td style={cellStyle}>{item.year.slice(-4)}</td>
      <td style={cellStyle}>{item.maxCrop}</td>
      <td style={cellStyle}>{item.minCrop}</td>
    </tr>
  ));

  const tableSection = () => {
    return (
      <div style={{ overflow: "auto", borderRadius: "10px" }}>
        <Table
          highlightOnHover
          withTableBorder
          style={{
            borderCollapse: "collapse",
            borderSpacing: 0,
            width: "100%",
            backgroundColor: "#ffffff",
          }}
        >
          <thead style={{ backgroundColor: "#1a73e8", color: "#ffffff" }}>
            <tr>
              <th style={tableHeaderStyle}>Year</th>
              <th style={tableHeaderStyle}>Max Production Crop</th>
              <th style={tableHeaderStyle}>Min Production Crop</th>
            </tr>
          </thead>
        </Table>
        <div
          style={{
            maxHeight: "80vh",
            overflowY: "scroll",
            border: "1px solid #ccc",
          }}
        >
          <Table
            highlightOnHover
            withTableBorder
            style={{
              borderCollapse: "collapse",
              borderSpacing: 0,
              width: "100%",
              backgroundColor: "#ffffff",
            }}
          >
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    );
  };

  const chartSection = () => {
    return (
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          gap: "10px",
          flexDirection: isSmallScreen ? "column" : "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <CropProductionExtremesChart data={processedData} />
      </div>
    );
  };

  return (
    <Card
      shadow="md"
      // padding="lg"
      radius="md"
      withBorder
      style={{
        width: "100%",
        margin: "20px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="lg"
        style={{ color: "#1a73e8", textAlign: "center" }}
      >
        Crop Production Extremes (1950-2020)
      </Text>
      {chartSection()}
      {tableSection()}
    </Card>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
  position: "sticky",
  top: 0,
  zIndex: 1,
};

const cellStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ccc",
};

export default CropProductionExtremesTable;
