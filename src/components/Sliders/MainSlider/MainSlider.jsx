import { useEffect } from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MainSliderItem from "./MainSliderItem";
import { fetchProducts } from "../../../redux/products.slice/products.slice";
import { useStyles } from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function MainSlider() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  if (status == "loading") {
    return <LinearProgress />;
  }
  return (
    <Carousel
      NavButton={({ onClick, className, next, prev }) => {
        return (
          <Button
            onClick={onClick}
            className={className}
            style={{
              opacity: 1,
              background: "none",
              borderRadius: 0,
              color: "#000",
              fontSize: "80px",
              top: "40%",
            }}
          >
            {next && <IoIosArrowForward />}
            {prev && <IoIosArrowBack />}
          </Button>
        );
      }}
      className={classes.carouselRoot}
    >
      {products?.data?.slice(0, 5).map((item) => (
        <Box key={item._id} className="image-container">
          <MainSliderItem item={item} />
        </Box>
      ))}
    </Carousel>
  );
}

export default MainSlider;
