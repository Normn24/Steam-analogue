import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";
import { fetchCatalogProducts } from "../../redux/catalogProducts.slice/catalogProducts.slice";
import { Link } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();
  const { catalogs } = useSelector((state) => state.catalogs);
  const { categoriesProducts, loading } = useSelector(
    (state) => state.categoriesProducts
  );
  const [hoveredItem, setHoveredItem] = useState(null);
  const [catalogItem, setCatalogItem] = useState(null);

  useEffect(() => {
    if (catalogItem !== null) {
      dispatch(fetchCatalogProducts(catalogItem));
    }
  }, [dispatch, catalogItem]);

  useEffect(() => {
    if (catalogs.length > 0 && catalogItem === null) {
      setCatalogItem(catalogs[0]?.name);
    }
    setHoveredItem(categoriesProducts[0]?._id);
  }, [categoriesProducts, catalogs, catalogItem]);

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
          minHeight: "855px",
          m: "60px 0",
        }}
      >
        <List
          sx={{
            display: "flex",
            width: "min-content",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: "15px",
            overflow: "hidden",
            margin: 0,
            padding: 0,
          }}
        >
          {catalogs?.slice(0, 3).map((value) => (
            <ListItemButton
              sx={{
                width: "auto",
                padding: "0",
                textTransform: "capitalize",
              }}
              key={value._id}
              onClick={() => setCatalogItem(value.name)}
              disableGutters
            >
              <ListItemText
                sx={{
                  margin: "0",
                  padding: "2px 10px",
                  textOverflow: "ellipsis",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  backgroundColor: catalogItem === value.name ? "#bdbdbd" : "",
                }}
                primary={value.name}
              />
            </ListItemButton>
          ))}
        </List>
        {categoriesProducts?.slice(0, 8).map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
          />
        ))}
        <Typography
          variant="p"
          component="div"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "70%",
            justifyContent: "flex-end",
          }}
        >
          More:
          <Link to={`/products/category/${catalogItem}`}>
            <Button
              variant="outlined"
              sx={{
                padding: "3px 10px",
                marginLeft: "5px",
                width: "auto",
                lineHeight: 1,
              }}
            >
              {catalogItem}
            </Button>
          </Link>
        </Typography>
      </Box>
    </>
  );
}
