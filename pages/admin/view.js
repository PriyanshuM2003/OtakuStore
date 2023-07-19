import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid, Pagination, Stack } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import ViewProduct from "../../src/components/dashboard/ViewProduct";
import FullLayout from "../../src/layouts/FullLayout";
import Product from '../../models/Product';
import mongoose from "mongoose";
import { useEffect } from "react";
import Router from 'next/router';

const View = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = Router
    useEffect(() => {
        if (!localStorage.getItem('admin')) {
            router.push('/')
        }
    }, [router])

    const updateProduct = async (updatedProducts) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProducts),
            });
            if (response.ok) {
                const updatedProductsResponse = await response.json();
                console.log(updatedProductsResponse);
            } else {
                console.error("Failed to update products.");
            }
        } catch (error) {
            console.error("Failed to update products.", error);
        }
    };


    return (
        <>
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
                            <ViewProduct products={products} currentPage={currentPage} updateProduct={updateProduct} itemsPerPage={itemsPerPage} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <BaseCard >
                                <Stack spacing={2}>
                                    <Pagination
                                        count={Math.ceil(products.length / itemsPerPage)}
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
    )
}

export default View

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONO_URI)
    }

    let products = await Product.find()

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }
    }
}