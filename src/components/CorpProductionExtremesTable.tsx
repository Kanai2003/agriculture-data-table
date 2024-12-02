import React, { useMemo } from "react";
import { Table, Card, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AgriculturalData } from "../type/type";

export const CropProductionExtremesTable: React.FC<{
  data: AgriculturalData[];
}> = ({ data }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const processedData = useMemo(() => {
    // Group data by year
    const yearlyProductionData = data.reduce((acc, item) => {
      const year = item.Year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {} as Record<string, AgriculturalData[]>);

    // Process each year to find max and min production crops
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

  const rows = processedData.map((item) => (
    <Table.Tr key={item.year}>
      <Table.Td>{item.year.slice(-4)}</Table.Td>
      <Table.Td>{item.maxCrop}</Table.Td>
      <Table.Td>{item.minCrop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        
        width: isSmallScreen ? "100%" : "50%",
        maxHeight: "90vh",
      }}
    >
      <Text size="lg" fw={700} mb="md">
        Crop Production Extremes (1950-2020)
      </Text>
      <div style={{ overflow: "auto" }}>
        <Table highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Year</Table.Th>
              <Table.Th>Max Production Crop</Table.Th>
              <Table.Th>Min Production Crop</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </Card>
  );
};
