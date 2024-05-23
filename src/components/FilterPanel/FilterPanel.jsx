import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Slider from "@mui/material/Slider";
import {
  TextField,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { fetchGenres } from "../../redux/genres.slice/genres.slice";
import SearchItem from "../SearchItem/SearchItem";
import { useNavigate, useLocation } from "react-router-dom";

function FilterPanel({ productList }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("name");
  const genreId = queryParams.get("genre");
  const products = useSelector((state) => state.products.products.data);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const genres = useSelector((state) => state.genres.genres);
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (productId) => {
    setHoveredItem(productId);
  };

  useEffect(() => {
    dispatch(fetchGenres());
    if (productList) {
      setFilteredProducts(productList);
    }
  }, [dispatch, productList, products]);

  const applyFilters = (values) => {
    let filtered = [...products];
    const params = new URLSearchParams();

    if (values.genreId) {
      filtered = filtered.filter((product) =>
        product.genres.some((item) => item._id === values.genreId)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.currentPrice >= values.priceRange[0] &&
        product.currentPrice <= values.priceRange[1]
    );

    filtered = filtered.filter((product) => {
      const year = new Date(product.yearOfPublication).getFullYear();
      return year >= values.yearRange[0] && year <= values.yearRange[1];
    });

    if (values.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(values.name.toLowerCase())
      );
    }

    if (values.sortBy === "atoz") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (values.sortBy === "ztoa") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
    if (values.genreId) params.append("genre", values.genreId);
    params.append("priceRange", values.priceRange.join(","));
    params.append("yearRange", values.yearRange.join(","));
    if (values.name) params.append("name", values.name);
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
          gap: "25px",
          justifyContent: "flex-end",
        }}
      >
        {filteredProducts?.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              position: "absolute",
              left: "25%",
              top: "5%",
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
                top: "0%",
              }}
              variant="h5"
              component="h5"
            >
              {`${filteredProducts?.length} results match your search.`}
            </Typography>
            <Box sx={{ width: "70%" }}>
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
        <div
          style={{
            width: "25%",
            height: "700px",
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 6px 9px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 11px 20px 5px",
            padding: "20px",
            borderRadius: "6px",
          }}
        >
          <h4>Filters</h4>

          <Divider style={{ marginBottom: "20px" }} />

          <Formik
            enableReinitialize
            initialValues={{
              genreId: genreId || "",
              priceRange: [0, 100],
              yearRange: [2010, 2025],
              name: searchQuery || "",
              sortBy: "",
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
                      applyFilters({ ...values, name: gameName });
                    }}
                    variant="outlined"
                  />
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
                    value={values.priceRange}
                    onChange={(event, newValue) => {
                      setFieldValue("priceRange", newValue);
                      applyFilters({ ...values, priceRange: newValue });
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                  />
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    $ {values.priceRange[0]}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    $ {values.priceRange[1]}
                  </Typography>
                </Box>

                <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />

                <Typography variant="subtitle1" gutterBottom>
                  Year Range
                </Typography>

                <FormControl fullWidth>
                  <Slider
                    value={values.yearRange}
                    onChange={(event, newValue) => {
                      setFieldValue("yearRange", newValue);
                      applyFilters({ ...values, yearRange: newValue });
                    }}
                    valueLabelDisplay="auto"
                    min={2010}
                    max={2024}
                  />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Year {values.yearRange[0]}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Year {values.yearRange[1]}
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
                    <MenuItem value="atoz">A to Z</MenuItem>
                    <MenuItem value="ztoa">Z to A</MenuItem>
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
                        priceRange: [100, 500],
                        yearRange: [2010, 2024],
                        name: "",
                        sortBy: "",
                      });
                    }}
                    variant="contained"
                  >
                    Clear Filters
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </>
  );
}

export default FilterPanel;
