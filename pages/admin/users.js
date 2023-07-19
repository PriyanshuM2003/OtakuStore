import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid, Pagination, Stack } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import ViewUsers from "../../src/components/dashboard/ViewUsers";
import FullLayout from "../../src/layouts/FullLayout";
import User from '../../models/User';
import mongoose from "mongoose";
import { useEffect } from "react";
import Router from 'next/router';

const Users = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const router = Router
    useEffect(() => {
        if (!localStorage.getItem('admin')) {
            router.push('/')
        }
    }, [router])

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
                            <ViewUsers users={users} currentPage={currentPage} usersPerPage={usersPerPage} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <BaseCard >
                                <Stack spacing={2}>
                                    <Pagination
                                        count={Math.ceil(users.length / usersPerPage)}
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

export default Users

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONO_URI)
    }

    let users = await User.find()

    return {
        props: { users: JSON.parse(JSON.stringify(users)) }
    }
}