import React, { useState, useEffect } from "react";
import BaseCard from "../baseCard/BaseCard";
import TableContainer from '@mui/material/TableContainer';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ViewOrders = ({ orders, currentPage, itemsPerPage }) => {
  const [dates, setDates] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = Array.isArray(orders)
    ? orders.slice(indexOfFirstItem, indexOfLastItem)
    : [];


  useEffect(() => {
    const orderDates = currentOrders.map((order) => new Date(order.createdAt));
    setDates(orderDates);
  }, []);


  return (
    <BaseCard title="Orders">
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Buyer
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  OrderId
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Qty
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  size/Color
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1">No orders to display.</Typography>
                </TableCell>
              </TableRow>
            )}
            {currentOrders.map((order, index) => (
              <TableRow key={order._id}>
                {Object.values(order.products).map((product) => (<>
                  <TableCell key={product}>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}>
                      {order.name}
                      <br />
                      {order.email}
                      <br />
                      {order.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}>
                      {order.order_id}
                    </Typography>
                    <hq className=" flex text-xs title-font tracking-widest">
                      Order placed on:{''}
                      <p className="text-xs title-font text-green-600 tracking-widest">
                        {dates[index] &&
                          dates[index].toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', })}
                      </p>
                    </hq>
                    <h1 className=" flex text-xs title-font tracking-widest">
                      Order Status:
                      <p className="text-xs title-font text-green-600 tracking-widest">
                        {order.status}
                      </p>
                    </h1>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      className="flex flex-col justify-center items-center" variant="h6">
                      <img className="mr-4" style={{ height: '3rem' }} src={product.img} />
                      {product.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }} color="textSecondary" variant="h6">
                      {product.qty}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      color="textSecondary" variant="h6">
                      {product.size} / {product.variant}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      variant="h6">₹{order.amount}</Typography>
                  </TableCell>
                </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ViewOrders;
