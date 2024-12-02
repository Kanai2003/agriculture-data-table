import React, { useMemo } from 'react';
import { Table, Card, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AgriculturalData } from '../type/type';


const CropYieldAndAreaTable: React.FC<{ data: AgriculturalData[] }> = ({ data }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const processedData = useMemo(() => {
    // Group data by crop
    const cropData = data.reduce((acc, item) => {
      const cropName = item['Crop Name'];
      if (!acc[cropName]) {
        acc[cropName] = [];
      }
      acc[cropName].push(item);
      return acc;
    }, {} as Record<string, AgriculturalData[]>);

    // Calculate average yield and cultivation area for each crop
    return Object.entries(cropData).map(([cropName, cropYearData]) => {
      const avgYield = cropYearData.reduce((sum, item) => 
        sum + Number(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']), 0) / cropYearData.length;
      
      const avgArea = cropYearData.reduce((sum, item) => 
        sum + Number(item['Area Under Cultivation (UOM:Ha(Hectares))']), 0) / cropYearData.length;

      return {
        cropName,
        avgYield: avgYield.toFixed(3),
        avgArea: avgArea.toFixed(3)
      };
    });
  }, [data]);

  const rows = processedData.map((item) => (
    <Table.Tr key={item.cropName}>
      <Table.Td>{item.cropName}</Table.Td>
      <Table.Td>{item.avgYield}</Table.Td>
      <Table.Td>{item.avgArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{
        width: isSmallScreen ? "100%" : "50%",
        maxHeight: "80vh",
        
      }}>
      <Text size="lg" fw={700} mb="md">Crop Yield and Cultivation Area (1950-2020)</Text>
      <div style={{overflow: 'auto'}}>
      <Table 
        highlightOnHover 
        withTableBorder 
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop Name</Table.Th>
            <Table.Th>Avg Yield (Kg/Ha)</Table.Th>
            <Table.Th>Avg Cultivation Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </div>
      </Card>
   
  );
};

export default  CropYieldAndAreaTable ;