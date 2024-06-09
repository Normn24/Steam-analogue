import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCatalogProducts } from "../redux/catalogProducts.slice/catalogProducts.slice";
import { Box, Typography } from "@mui/material";
import CategoryItem from "../components/CategoryItem/CategoryItem";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { catalogQuery } = useParams();
  const { categoriesProducts } = useSelector(
    (state) => state.categoriesProducts
  );
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCatalogProducts(catalogQuery));
  }, [dispatch, catalogQuery]);

  useEffect(() => {
    if (catalogQuery === "Most Played") {
      setCurrentCategory("Players");
    } else if (catalogQuery === "Top Sellers") {
      setCurrentCategory("Weeks");
    } else {
      setCurrentCategory("Reales Date");
    }
  }, [catalogQuery]);

  const handleMouseEnter = (productId) => {
    setHoveredItem(productId);
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          position: "relative",
          minHeight: "60svh",
          m: { xs: "0", md: "60px 0" },
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "34px", md: "48px" },
          }}
        >
          {catalogQuery}
        </Typography>
        <Box
          sx={{
            display: "flex",
            margin: { xs: "15px 8px 0", md: "15px 15px 0" },
            position: "relative",
            textTransform: "uppercase",
            justifyContent: "space-between",
            height: { xs: "15px", md: "25px" },
          }}
        >
          <Typography
            variant="p"
            component="p"
            sx={{ position: "absolute", fontSize: { xs: "10px", md: "16px" } }}
          >
            Rate
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              position: "absolute",
              right: { xs: "75px", md: "29.5%" },
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            Price
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              position: "absolute",
              right: "0",
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            {currentCategory}
          </Typography>
        </Box>
        {categoriesProducts?.map((product, index) => (
          <CategoryItem
            key={product._id}
            product={product}
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
            rank={index + 1}
            currentCategory={currentCategory}
          />
        ))}
      </Box>
    </>
  );
}
