"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface dataTypes {
  cropName: string;
  avgYield: number | string;
  avgArea: number | string;
}

const CropYieldBarChart = ({ data }: { data: dataTypes[] }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const chart = echarts.init(chartRef.current!, null, { renderer: "svg" });

    const option = {
      tooltip: {
        trigger: "axis",
        formatter: "{b}: {c} Kg/Ha",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.cropName),
        axisLabel: {
          rotate: 90,
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
        name: "Yield (Kg/Ha)",
      },
      series: [
        {
          data: data.map((item) => parseFloat(item.avgYield.toString())),
          type: "bar",
          itemStyle: { color: "#1a73e8" },
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => chart.resize());

    return () => {
      window.removeEventListener("resize", () => chart.resize());
      chart.dispose();
    };
  }, [data, isSmallScreen]);

  return (
    <Card
      shadow="md"
      radius="md"
      withBorder
      style={{
        marginBottom: 20,
        width: "100%",
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="lg"
        style={{ color: "#1a73e8", textAlign: "center" }}
      >
        Average Crop Yield Distribution
      </Text>
      <div
        ref={chartRef}
        style={{
          height: isSmallScreen ? 300 : 400,
          width: "100%",
        }}
      />
    </Card>
  );
};

const CropAreaPieChart = ({ data }: { data: dataTypes[] }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const chart = echarts.init(chartRef.current!, null, { renderer: "svg" });

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} Ha ({d}%)",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: { show: true },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          data: data.map((item) => ({
            name: item.cropName,
            value: parseFloat(item.avgArea.toString()),
          })),
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => chart.resize());

    return () => {
      window.removeEventListener("resize", () => chart.resize());
      chart.dispose();
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
      }}
    >
      <Text
        size="xl"
        fw={700}
        mb="lg"
        style={{ color: "#1a73e8", textAlign: "center" }}
      >
        Cultivation Area Distribution
      </Text>
      <div
        ref={chartRef}
        style={{
          height: isSmallScreen ? 300 : 400,
          width: "100%",
        }}
      />
    </Card>
  );
};

export { CropYieldBarChart, CropAreaPieChart };
