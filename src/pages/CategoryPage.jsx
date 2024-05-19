import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  // Button,
  Typography,
  // List,
  // ListItemButton,
  // ListItemText,
} from "@mui/material";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import { fetchCatalogProducts } from "../redux/catalogProducts.slice/catalogProducts.slice";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { catalogQuery } = useParams();
  const { categoriesProducts, loading } = useSelector(
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

  if (loading) {
    return "";
  }
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
          <Typography variant="p" component="p">
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
