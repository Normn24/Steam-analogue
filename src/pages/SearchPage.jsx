import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchFilteredProducts } from "../redux/filteredProducts.slice/filteredProducts.slice";
import { useParams } from "react-router-dom";
import FilterPanel from "../components/Filter/FilterPanel";
// import SearchItem from "../components/SearchItem/SearchItem";
import { fetchProducts } from "../redux/products.slice/products.slice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const { productList } = useSelector((state) => state.productList);
  const products = useSelector((state) => state.products.products.data);

  useEffect(() => {
    dispatch(
      fetchFilteredProducts(
        `http://localhost:4000/api/products?q=${searchQuery}`
      )
    );
    dispatch(fetchProducts());
  }, [dispatch, searchQuery]);

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
        <FilterPanel
          productList={productList?.data}
          searchQuery={searchQuery}
          products={products}
        />
      </Box>
    </>
  );
}
