import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import ProductItem from "../components/ProductItem/ProductItem";
import { fetchFilteredProducts } from "../redux/filteredProducts.slice/filteredProducts.slice";
import { useParams } from "react-router-dom";

export default function FilteredPage() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const { productList } = useSelector((state) => state.productList);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    dispatch(
      fetchFilteredProducts(
        `http://localhost:4000/api/products?q=${searchQuery}`
      )
    );
  }, [dispatch, searchQuery]);

  const handleMouseEnter = (productId) => {
    setHoveredItem(productId);
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          position: "relative",
          height: "855px",
          m: "60px 0",
        }}
      >
        {productList?.data?.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
          />
        ))}
      </Box>
    </>
  );
}
