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
      setCurrentCategory("Current Players");
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
          m: "60px 0",
        }}
      >
        <Typography variant="h3" component="h3">
          {catalogQuery}
        </Typography>
        <Box
          sx={{
            display: "flex",
            margin: "15px 15px 0",
            textTransform: "uppercase",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="p" component="p" sx={{ width: "50%" }}>
            Rate
          </Typography>
          <Typography variant="p" component="p">
            Price
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ width: "151px", textAlign: "right" }}
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
