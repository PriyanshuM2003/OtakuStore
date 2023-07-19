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
  TextField,
  Button
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const ViewProduct = ({ products, currentPage, itemsPerPage, updateProduct }) => {
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (event, productId, field) => {
    const updatedProduct = currentProducts.find(
      (product) => product._id === productId
    );

    if (field === "title") {
      updatedProduct.title = event.target.value;
    } else if (field === "availableQty") {
      updatedProduct.availableQty = event.target.value;
    } else if (field === "price") {
      updatedProduct.price = event.target.value;
    }

    const updatedProductsCopy = [...updatedProducts];
    const index = updatedProductsCopy.findIndex(
      (product) => product._id === productId
    );

    if (index !== -1) {
      updatedProductsCopy[index] = updatedProduct;
    } else {
      updatedProductsCopy.push(updatedProduct);
    }

    setUpdatedProducts(updatedProductsCopy);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await updateProduct(updatedProducts);
      toast.success('Product Updated Successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Failed to update product.", error);
    }
  };

  return (
    <BaseCard title="All Products">
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
                Product Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            {/* <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell> */}
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Available Qty.
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}>
                  {product._id}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "20rem"
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  className="flex flex-row justify-start items-center" color="Textprimary" variant="h6">
                  <img className="mr-4" style={{ height: '3rem' }} src={product.img} alt={product.title} />
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    variant="outlined"
                    value={product.title}
                    onChange={(event) => handleInputChange(event, product._id, "title")}
                  />
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }} color="textSecondary" variant="h6">
                  {product.slug}
                </Typography>
              </TableCell> */}
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  color="textSecondary" variant="h6">
                  {product.size} / {product.color}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  display="flex"
                  flexDirection={"column"}
                  color="textSecondary" variant="h6">
                  <TextField
                    sx={{
                      width: "40%",
                    }}
                    variant="outlined"
                    value={product.availableQty}
                    onChange={(event) => handleInputChange(event, product._id, "availableQty")}
                  />

                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  variant="h6">₹
                </Typography>
                <TextField
                  sx={{
                    width: "60%",
                  }}
                  variant="outlined"
                  value={product.price}
                  onChange={(event) => handleInputChange(event, product._id, "price")}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={handleUpdateProduct}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default ViewProduct;
