import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid, Pagination, Stack } from "@mui/material";
import ViewOrders from "../../src/components/dashboard/ViewOrders";
import { useState } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Order from "../../models/Order";
import mongoose from "mongoose";
import { useEffect } from "react";
import Router from "next/router";

const Orders = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = Router;

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (!orders) {
    return null;
  }

  const updateOrderS = async (updatedOrder) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updateorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );
      if (response.ok) {
        const updatedOrderResponse = await response.json();
        console.log(updatedOrderResponse);
      } else {
        console.error("Failed to update order.");
      }
    } catch (error) {
      console.error("Failed to update order.", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          footer {
            display: none;
          }
          header {
            display: none;
          }
        `}</style>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <ViewOrders
                orders={orders}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                updateOrderS={updateOrderS}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12} display="flex" justifyContent="center">
              <BaseCard>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(orders.length / itemsPerPage)}
                    color="secondary"
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                  />
                </Stack>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONO_URI);
  }
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
