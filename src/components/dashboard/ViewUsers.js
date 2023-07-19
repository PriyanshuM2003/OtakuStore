import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const ViewUsers = ({ users, currentPage, usersPerPage }) => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


    return (
        <BaseCard title="All Users">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <Table
                aria-label="simple table"
                sx={{
                    whiteSpace: "nowrap",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                User Id
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Email Id
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Phone
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Address
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}>
                                    {user._id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                    className="flex flex-row justify-start items-center" color="Textprimary" variant="h6">
                                    {user.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                    color="textSecondary" variant="h6">
                                    {user.email}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                    color="textSecondary" variant="h6">
                                    {user.phone}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                    variant="h6">
                                    {user.address},{user.city},{user.state},{user.pincode}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default ViewUsers;
