import React, { useState, useEffect } from "react";
import BaseCard from "../baseCard/BaseCard";
import TableContainer from "@mui/material/TableContainer";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ViewOrders = ({ orders, currentPage, itemsPerPage, updateOrderS }) => {
  const [dates, setDates] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = Array.isArray(orders)
    ? orders.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handleChange = (event, orderIndex) => {
    const newDStatus = event.target.value;
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].deliverystatus = newDStatus;

    setDeliveryStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[orderIndex] = newDStatus;
      return updatedStatus;
    });

    updateOrderS(updatedOrders);
  };

  const datesAreEqual = (dates1, dates2) => {
    if (dates1.length !== dates2.length) return false;

    for (let i = 0; i < dates1.length; i++) {
      if (dates1[i].getTime() !== dates2[i].getTime()) return false;
    }

    return true;
  };

  useEffect(() => {
    const orderDates = currentOrders.map((order) => new Date(order.createdAt));

    if (!datesAreEqual(orderDates, dates)) {
      setDates(orderDates);
    }
  }, [currentPage, itemsPerPage, currentOrders, dates]);

  return (
    <BaseCard title="Orders">
      <TableContainer style={{ overflowX: "auto" }}>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
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
                  Update Delivery Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  size/Color
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Qty/Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1">No orders to display.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentOrders.map((order, index) => (
                <TableRow key={order._id}>
                  {Object.values(order.products).map(
                    (product, productIndex) => (
                      <React.Fragment key={productIndex}>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
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
                            }}
                          >
                            {order.order_id}
                          </Typography>
                          <h1 className=" flex text-xs title-font tracking-widest">
                            Order placed on:{""}
                            <p className="text-xs title-font text-green-600 tracking-widest">
                              {dates[index] &&
                                dates[index].toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                            </p>
                          </h1>
                          <h1 className=" flex text-xs title-font tracking-widest">
                            Order Status:
                            <p className="text-xs title-font text-green-600 tracking-widest">
                              {order.status}
                            </p>
                          </h1>
                          <h1 className=" flex text-xs title-font tracking-widest">
                            Delivery Status:
                            <p className="text-xs title-font text-green-600 tracking-widest">
                              {order.deliverystatus}
                            </p>
                          </h1>
                        </TableCell>
                        <TableCell>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                              value={
                                deliveryStatus[index] || order.deliverystatus
                              }
                              onChange={(event) => handleChange(event, index)}
                            >
                              <MenuItem value={order.deliverystatus}>
                                <em>{order.deliverystatus}</em>
                              </MenuItem>
                              <MenuItem value="Shipped">Shipped</MenuItem>
                              <MenuItem value="Out for Delivery">
                                Out for Delivery
                              </MenuItem>
                              <MenuItem value="Delivered">Delivered</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                            className="flex flex-col justify-center items-center"
                            variant="h6"
                          >
                            <img
                              className="mr-4"
                              style={{ height: "3rem" }}
                              src={product.img}
                              alt={product.name}
                            />
                            {product.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                            color="textSecondary"
                            variant="h6"
                          >
                            {product.size} / {product.variant}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                            variant="h6"
                          >
                            {product.qty} / ₹{order.amount}
                          </Typography>
                        </TableCell>
                      </React.Fragment>
                    )
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ViewOrders;
