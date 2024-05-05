import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products.slice/products.slice";
import { Box, Button, Typography } from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";

export default function Products() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  useEffect(() => {
    if (products?.data?.length > 0) {
      setHoveredItem(products.data[0]._id);
    }
  }, [products]);

  const handleMouseEnter = (productId) => {
    setHoveredItem(productId);
  };

  if (status === "failed") {
    return <h1>No products 😢</h1>;
  }

  return (
    <>
      <Box sx={{ padding: "20px", position: "relative" }}>
        {products?.data?.slice(0, 8).map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
          />
        ))}
        <Typography variant="p" component="p" sx={{ wordSpacing: "10px" }}>
          More:
          <Button
            variant="outlined"
            href="#outlined-buttons"
            sx={{
              padding: "3px",
              marginLeft: "5px",
            }}
          >
            Link
          </Button>
        </Typography>
      </Box>
    </>
  );
}
