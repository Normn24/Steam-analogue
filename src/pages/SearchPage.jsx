import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchFilteredProducts } from "../redux/filteredProducts.slice/filteredProducts.slice";
import { useLocation } from "react-router-dom";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import { fetchGenres } from "../redux/genres.slice/genres.slice";
import { fetchProducts } from "../redux/products.slice/products.slice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genre");
  const searchQuery = queryParams.get("name");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const startYear = queryParams.get("startYear");
  const endYear = queryParams.get("endYear");
  const sort = queryParams.get("sortBy");

  const { productList } = useSelector((state) => state.productList);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (searchQuery) searchParams.append("q", searchQuery);
    if (genreId) searchParams.append("genres", genreId);
    if (minPrice) searchParams.append("minPrice", minPrice);
    if (maxPrice) searchParams.append("maxPrice", maxPrice);
    if (startYear) searchParams.append("startYear", startYear);
    if (endYear) searchParams.append("endYear", endYear);
    if (sort) searchParams.append("sort", sort);
    const url = `/api/products?${searchParams.toString()}`;

    dispatch(fetchFilteredProducts(url || null));
    dispatch(fetchProducts());
    dispatch(fetchGenres());
  }, [
    dispatch,
    searchQuery,
    genreId,
    minPrice,
    maxPrice,
    startYear,
    endYear,
    sort,
  ]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          position: "relative",
          minHeight: "855px",
          m: { xs: "20px 0", md: "60px 0" },
        }}
      >
        <FilterPanel productList={productList?.data} />
      </Box>
    </>
  );
}
