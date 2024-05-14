import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchFilteredProducts } from "../redux/filteredProducts.slice/filteredProducts.slice";
import { useParams } from "react-router-dom";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import { fetchProducts } from "../redux/products.slice/products.slice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const { genreId } = useParams();
  const { productList } = useSelector((state) => state.productList);
  const products = useSelector((state) => state.products.products.data);

  useEffect(() => {
    if (searchQuery) {
      dispatch(
        fetchFilteredProducts(
          `http://localhost:4000/api/products?q=${searchQuery}`
        )
      );
    }
    if (genreId) {
      dispatch(
        fetchFilteredProducts(
          `http://localhost:4000/api/products/genre=${genreId}`
        )
      );
    }
    dispatch(fetchProducts());
  }, [dispatch, searchQuery, genreId]);

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
