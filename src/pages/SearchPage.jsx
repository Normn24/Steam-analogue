import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchFilteredProducts } from "../redux/filteredProducts.slice/filteredProducts.slice";
import { useLocation } from "react-router-dom";
import FilterPanel from "../components/FilterPanel/FilterPanel";

export default function SearchPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genre");
  const searchQuery = queryParams.get("name");

  const { productList } = useSelector((state) => state.productList);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (searchQuery) searchParams.append("q", searchQuery);
    if (genreId) searchParams.append("genres", genreId);
    console.log(searchParams);
    const url = `http://localhost:4000/api/products?${searchParams.toString()}`;

    dispatch(fetchFilteredProducts(url || null));
  }, [dispatch, searchQuery, genreId]);

  // useEffect(() => {
  //   if (searchQuery && genreId) {
  //     dispatch(
  //       fetchFilteredProducts(
  //         `http://localhost:4000/api/products?q=${searchQuery}&genres=${genreId}`
  //       )
  //     );
  //   } else if (genreId) {
  //     dispatch(
  //       fetchFilteredProducts(
  //         `http://localhost:4000/api/products?genres=${genreId}`
  //       )
  //     );
  //   } else if (searchQuery) {
  //     dispatch(
  //       fetchFilteredProducts(
  //         `http://localhost:4000/api/products?q=${searchQuery}`
  //       )
  //     );
  //   }
  //   if (searchQuery === "" || genreId === "") {
  //     dispatch(fetchProducts());
  //   }
  //   dispatch(fetchProducts());
  // }, [dispatch, searchQuery, genreId]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          position: "relative",
          minHeight: "855px",
          m: "60px 0",
        }}
      >
        <FilterPanel productList={productList?.data} />
      </Box>
    </>
  );
}
