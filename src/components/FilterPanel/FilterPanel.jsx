import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import SearchItem from "../SearchItem/SearchItem";
import {
  TextField,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Typography,
  Box,
  Slider,
} from "@mui/material";
import { BsFilterRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { grid } from "ldrs";

function FilterPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products.data);
  const genres = useSelector((state) => state.genres.genres);
  const productList = useSelector(
    (state) => state.productList.productList.data
  );
  const loading = useSelector((state) => state.productList.loading);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("name");
  const genreId = queryParams.get("genre");
  const startYear = queryParams.get("startYear");
  const endYear = queryParams.get("endYear");
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const sort = queryParams.get("sortBy");
  grid.register();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleMouseEnter = (productId) => {
    setHoveredItem(productId);
  };

  useEffect(() => {
    setFilteredProducts(productList);
  }, [productList]);

  const applyFilters = (values) => {
    let filtered = [...productList];
    const params = new URLSearchParams();

    if (values.genreId) {
      filtered = filtered.filter((product) =>
        product.genres.some((item) => item._id === values.genreId)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.currentPrice >= values.minPrice &&
        product.currentPrice <= values.maxPrice
    );

    filtered = filtered.filter((product) => {
      const year = new Date(product.yearOfPublication).getFullYear();
      return year >= values.startYear && year <= values.endYear;
    });

    if (values.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(values.name.toLowerCase())
      );
    }

    if (values.sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (values.sortBy === "-name") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (values.sortBy === "currentPrice") {
      filtered.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (values.sortBy === "-currentPrice") {
      filtered.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    setFilteredProducts(filtered);
    if (values.name) params.append("name", values.name);
    if (values.genreId) params.append("genre", values.genreId);
    params.append("minPrice", values.minPrice);
    params.append("maxPrice", values.maxPrice);
    params.append("startYear", values.startYear);
    params.append("endYear", values.endYear);
    if (values.sortBy) params.append("sortBy", values.sortBy);
    navigate(`/products/search/?${params.toString()}`);
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: "40px",
          position: "relative",
          minHeight: "855px",
          display: "flex",
          gap: "60px",
          justifyContent: "flex-end",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <l-grid
              size="160"
              speed="1"
              color="black"
              className="loadingSearch"
              style={{
                top: "0%",
                height: "100%",
                width: "69%",
                position: "absolute",
                left: "-1%",
                backgroundColor: "#fff",
                zIndex: 1100,
              }}
            ></l-grid>
          </Box>
        )}
        <Button
          onClick={toggleFilters}
          sx={{
            display: { xs: "flex", md: "none" },
            position: "absolute",
            top: "0%",
            right: -7,
            minWidth: "auto",
          }}
        >
          {filtersOpen ? (
            <IoCloseOutline style={{ fontSize: "26px" }} />
          ) : (
            <BsFilterRight style={{ fontSize: "26px" }} />
          )}
        </Button>
        {filteredProducts?.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              position: "absolute",
              left: "25%",
              top: "5%",
              fontSize: { xs: "3vw", md: "24px" },
            }}
            variant="h5"
            component="h5"
          >
            0 results match your search.
          </Typography>
        ) : (
          <>
            <Typography
              sx={{
                textAlign: "center",
                position: "absolute",
                left: "0",
                top: { xs: "1%", md: "0%" },
                fontSize: { xs: "18px", md: "24px" },
              }}
              variant="h5"
              component="h5"
            >
              {`${filteredProducts?.length} results match your search.`}
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", md: "67%" },
                display: filtersOpen && "none",
              }}
            >
              {filteredProducts?.map((product) => (
                <SearchItem
                  key={product._id}
                  product={product}
                  hoveredItem={hoveredItem}
                  handleMouseEnter={handleMouseEnter}
                />
              ))}
            </Box>
          </>
        )}
        <Box
          sx={{
            width: { xs: "calc(100% - 40px)", md: "25%" },
            display: { xs: filtersOpen ? "block" : "none", md: "block" },
            position: { xs: "absolute", md: "static" },
            height: "min-content",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 6px 9px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 11px 20px 5px",
            padding: "20px",
            borderRadius: "6px",
            backgroundColor: "#fff",
          }}
        >
          <h4>Filters</h4>
          <Divider style={{ marginBottom: "20px" }} />
          <Formik
            enableReinitialize
            initialValues={{
              genreId: genreId || "",
              minPrice: minPrice || 0,
              maxPrice: maxPrice || 100,
              startYear: startYear || 2010,
              endYear: endYear || 2025,
              name: searchQuery || "",
              sortBy: sort || "",
            }}
            onSubmit={(values) => {
              applyFilters(values);
            }}
          >
            {({ values, setFieldValue, setValues }) => (
              <Form>
                <FormControl fullWidth>
                  <TextField
                    id="name"
                    name="name"
                    label="Game Name"
                    value={values.name}
                    onChange={(event) => {
                      const gameName = event.target.value;
                      setFieldValue("name", gameName);
                    }}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => applyFilters({ ...values })}
                    style={{ marginTop: "10px", backgroundColor: "#000" }}
                  >
                    Search
                  </Button>
                </FormControl>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <FormControl fullWidth>
                  <TextField
                    select
                    id="genreId"
                    name="genre"
                    label="Genre"
                    value={values.genreId}
                    onChange={(event) => {
                      const selectedGenreId = event.target.value;
                      setFieldValue("genreId", selectedGenreId);
                      applyFilters({ ...values, genreId: selectedGenreId });
                    }}
                    variant="outlined"
                  >
                    <MenuItem value={""}>All</MenuItem>
                    {genres.map((genre) => (
                      <MenuItem key={genre._id} value={genre._id}>
                        {genre.name.toUpperCase()}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <Typography variant="subtitle1" gutterBottom>
                  Price Range
                </Typography>

                <FormControl fullWidth>
                  <Slider
                    value={[Number(values.minPrice), Number(values.maxPrice)]}
                    onChange={(event, newValue) => {
                      const [minPrice, maxPrice] = newValue;
                      setFieldValue("minPrice", minPrice);
                      setFieldValue("maxPrice", maxPrice);
                      applyFilters({ ...values, minPrice, maxPrice });
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    sx={{ color: "#000" }}
                  />
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    $ {values.minPrice}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    $ {values.maxPrice}
                  </Typography>
                </Box>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <Typography variant="subtitle1" gutterBottom>
                  Year Range
                </Typography>

                <FormControl fullWidth>
                  <Slider
                    value={[Number(values.startYear), Number(values.endYear)]}
                    onChange={(event, newValue) => {
                      const [startYear, endYear] = newValue;
                      setFieldValue("startYear", startYear);
                      setFieldValue("endYear", endYear);
                      applyFilters({ ...values, startYear, endYear });
                    }}
                    valueLabelDisplay="auto"
                    min={2010}
                    max={2025}
                    sx={{ color: "#000" }}
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Year {values.startYear}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Year {values.endYear}
                  </Typography>
                </Box>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <FormControl fullWidth>
                  <TextField
                    select
                    id="sortBy"
                    name="sort"
                    label="Sort in Order"
                    value={values.sortBy}
                    onChange={(event) => {
                      const sortingOrder = event.target.value;
                      setFieldValue("sortBy", sortingOrder);
                      applyFilters({ ...values, sortBy: sortingOrder });
                    }}
                    variant="outlined"
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="name">A to Z</MenuItem>
                    <MenuItem value="-name">Z to A</MenuItem>
                    <MenuItem value="currentPrice">Price: Low to High</MenuItem>
                    <MenuItem value="-currentPrice">
                      Price: High to Low
                    </MenuItem>
                  </TextField>
                </FormControl>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <FormControl fullWidth>
                  <Button
                    type="button"
                    onClick={() => {
                      setFilteredProducts(products);
                      setValues({
                        genreId: "",
                        minPrice: 0,
                        maxPrice: 100,
                        startYear: 2010,
                        endYear: 2025,
                        name: "",
                        sortBy: "",
                      });
                      navigate("/products/search");
                    }}
                    variant="contained"
                    style={{ backgroundColor: "#000" }}
                  >
                    Clear Filters
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default FilterPanel;
