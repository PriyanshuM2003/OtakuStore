import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import AddProduct from '../../src/components/dashboard/AddProduct';
import { Grid } from "@mui/material";
import { useEffect } from "react";
import Router from 'next/router';

const Add = () => {
    const router = Router
    useEffect(() => {
        if (!localStorage.getItem('admin')) {
            router.push('/')
        }
    }, [])
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
                            <AddProduct />
                        </Grid>
                    </Grid>
                </FullLayout>
            </ThemeProvider>
        </>
    )
}

export default Add;