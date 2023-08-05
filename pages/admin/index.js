import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect } from "react";
import Router from 'next/router';
import Order from "../../models/Order"
import mongoose from 'mongoose';
import ViewOrders from "../../src/components/dashboard/ViewOrders";

export default function Index({ orders }) {
    const router = Router;

    const itemsPerPage = 5;
    const currentPage = 1;

    useEffect(() => {
        if (!localStorage.getItem('admin')) {
            router.push('/')
        }
    }, [])

    if (!orders) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer{
            display:none;
        }
        header{
            display:none;
        }
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview orders={orders} />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    {/* <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid> */}
                    <Grid item xs={12} lg={12}>
                        <ViewOrders orders={orders} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                    </Grid>
                    {/* <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid> */}
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONO_URI)
    }
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders))
        }

    }
}


