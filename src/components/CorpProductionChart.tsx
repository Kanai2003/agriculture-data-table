"ues client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface ProcessedData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

const CropProductionExtremesChart = ({ data }: { data: ProcessedData[] }) => {
  const chartRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const chart = echarts.init(chartRef.current, null, { renderer: "svg" });

    const years = data.map((item) => item.year.slice(-4));
    const maxCrops = data.map((item) => item.maxCrop);
    const minCrops = data.map((item) => item.minCrop);

    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const year = years[params.dataIndex];
          const cropType = params.seriesName;
          const cropName =
            cropType === "Max Production Crop"
              ? maxCrops[params.dataIndex]
              : minCrops[params.dataIndex];
          return `${year}<br/>${cropType}: ${cropName}`;
        },
      },
      legend: {
        data: ["Max Production Crop", "Min Production Crop"],
        top: 20,
        textStyle: { color: "#1a73e8" },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: years,
        axisLabel: {
          rotate: 90,
          interval: 0,
          fontSize: 16,
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          name: "Max Production Crop",
          type: "scatter",
          data: years.map((_, idx) => [idx, 1]),
          label: {
            show: true,
            position: "bottom",
            rotate: isSmallScreen ? 90 : 45,
            formatter: (params: any) => maxCrops[params.dataIndex],
            fontSize: isSmallScreen ? 9 : 14,
            color: "#1a73e8",
          },
          symbolSize: isSmallScreen ? 9 : 14,
        },
        {
          name: "Min Production Crop",
          type: "scatter",
          data: years.map((_, idx) => [idx, -1]),
          label: {
            show: true,
            position: "top",
            rotate: isSmallScreen ? 90 : 45,
            formatter: (params: any) => minCrops[params.dataIndex], // Show crop name on label
            fontSize: isSmallScreen ? 9 : 14,
            color: "#f44336",
          },
          symbolSize: isSmallScreen ? 9 : 14,
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, isSmallScreen]);

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      style={{
        marginBottom: 20,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="lg"
        style={{ color: "#1a73e8", textAlign: "center" }}
      >
        Crop Production Extremes Over Time
      </Text>
      <div
        ref={chartRef}
        style={{
          height: "400px",
          width: "100%",
        }}
      />
    </Card>
  );
};

export default CropProductionExtremesChart;
