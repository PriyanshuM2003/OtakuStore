import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = ({ orders }) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const salesSummary = calculateSalesSummary(orders);
    setSalesData(salesSummary);
  }, [orders]);

  const calculateSalesSummary = (orders) => {
    const salesSummary = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const yearMonthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!salesSummary[yearMonthKey]) {
        salesSummary[yearMonthKey] = {
          month: date.toLocaleString("default", { month: "short" }),
          year: date.getFullYear(),
          totalAmount: 0,
          ordersCount: 0,
        };
      }
      salesSummary[yearMonthKey].totalAmount += order.amount;
      salesSummary[yearMonthKey].ordersCount++;
    });
    return Object.values(salesSummary);
  };

  const getMonthIndex = (monthName) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames.indexOf(monthName);
  };

  const sortedSalesData = salesData.sort((a, b) => {
    const yearComparison = a.year - b.year;
    if (yearComparison !== 0) {
      return yearComparison;
    }
    return getMonthIndex(a.month) - getMonthIndex(b.month);
  });

  const xAxisCategories = sortedSalesData.map((item) => `${item.month} ${item.year}`);

  const maxTotalAmount = Math.max(...salesData.map((item) => item.totalAmount));
  const maxOrdersCount = Math.max(...salesData.map((item) => item.ordersCount));
  const maxYAxisValue = Math.max(maxTotalAmount, maxOrdersCount);

  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: xAxisCategories,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: maxYAxisValue,
      tickAmount: 10,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  const seriessalesoverview = [
    {
      name: "Total Sales",
      data: salesData.map((item) => item.totalAmount),
    },
    {
      name: "Orders Count",
      data: salesData.map((item) => item.ordersCount),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" gutterBottom>
          Sales Overview
        </Typography>
        <Box>
          <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;