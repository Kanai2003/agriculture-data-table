import React, { useMemo } from 'react';
import { Table, Card, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AgriculturalData } from '../type/type';

const CropYieldAndAreaTable: React.FC<{ data: AgriculturalData[] }> = ({ data }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const processedData = useMemo(() => {
    
    const cropData = data.reduce((acc, item) => {
      const cropName = item['Crop Name'];
      if (!acc[cropName]) {
        acc[cropName] = [];
      }
      acc[cropName].push(item);
      return acc;
    }, {} as Record<string, AgriculturalData[]>);

    return Object.entries(cropData).map(([cropName, cropYearData]) => {
      const avgYield = cropYearData.reduce(
        (sum, item) =>
          sum + Number(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']),
        0
      ) / cropYearData.length;

      const avgArea = cropYearData.reduce(
        (sum, item) =>
          sum + Number(item['Area Under Cultivation (UOM:Ha(Hectares))']),
        0
      ) / cropYearData.length;

      return {
        cropName,
        avgYield: avgYield.toFixed(3),
        avgArea: avgArea.toFixed(3),
      };
    });
  }, [data]);

  const rows = processedData.map((item, index) => (
    <tr
      key={item.cropName}
      style={{
        backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e7ff',
        borderBottom: '1px solid #ccc',
      }}
    >
      <td style={cellStyle}>{item.cropName}</td>
      <td style={cellStyle}>{item.avgYield}</td>
      <td style={cellStyle}>{item.avgArea}</td>
    </tr>
  ));

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: isSmallScreen ? '100%' : '80%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="lg"
        style={{ color: '#1a73e8', textAlign:'center' }}
      >
        Crop Yield and Cultivation Area (1950-2020)
      </Text>
      <div style={{ overflow: 'auto' }}>
        <Table
          highlightOnHover
          withTableBorder
          style={{
            borderCollapse: 'collapse',
            borderSpacing: 0,
            width: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          <thead style={{ backgroundColor: '#1a73e8', color: '#ffffff' }}>
            <tr>
              <th style={tableHeaderStyle}>Crop Name</th>
              <th style={tableHeaderStyle}>Avg Yield (Kg/Ha)</th>
              <th style={tableHeaderStyle}>Avg Cultivation Area (Ha)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </Card>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd',
};

const cellStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ccc',
};

export default CropYieldAndAreaTable;
