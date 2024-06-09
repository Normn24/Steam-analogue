import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MemoizedProductItem from "../ProductItem/ProductItem";
import { fetchCatalogProducts } from "../../redux/catalogProducts.slice/catalogProducts.slice";
import { Link } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();
  const { catalogs } = useSelector((state) => state.catalogs);
  const { categoriesProducts } = useSelector(
    (state) => state.categoriesProducts
  );
  const [hoveredItem, setHoveredItem] = useState(null);
  const [catalogItem, setCatalogItem] = useState(null);
  const [allProducts, setAllProducts] = useState({});

  useEffect(() => {
    if (catalogs.length > 0) {
      catalogs.forEach((catalog) => {
        dispatch(fetchCatalogProducts(catalog.name)).then((response) => {
          setAllProducts((prev) => ({
            ...prev,
            [catalog.name]: response.payload,
          }));
        });
      });
    }
  }, [dispatch, catalogs]);

  useEffect(() => {
    if (catalogs.length > 0 && catalogItem === null) {
      setCatalogItem(catalogs[0]?.name);
    }
    if (allProducts[catalogItem] && allProducts[catalogItem].length > 0) {
      setHoveredItem(allProducts[catalogItem][0]?._id);
    }
  }, [categoriesProducts, catalogs, catalogItem, allProducts]);

  const handleMouseEnter = useCallback((productId) => {
    setHoveredItem(productId);
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: { xs: "10px", md: "20px" },
          position: "relative",
          minHeight: "855px",
          m: "60px 0",
        }}
      >
        <List
          sx={{
            display: "flex",
            width: { xs: "auto", md: "min-content" },
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
                  textAlign: "center",
                  backgroundColor: catalogItem === value.name ? "#bdbdbd" : "",
                }}
                primaryTypographyProps={{
                  fontSize: { xs: "3.5vw ", md: "16px" },
                }}
                primary={value.name}
              />
            </ListItemButton>
          ))}
        </List>
        {allProducts[catalogItem]?.slice(0, 8).map((product) => (
          <MemoizedProductItem
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
            width: { md: "70%" },
            justifyContent: "flex-end",
            fontSize: { xs: "12px ", md: "16px" },
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
                fontSize: { xs: "11px ", md: "16px" },
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
