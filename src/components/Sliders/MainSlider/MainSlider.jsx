import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MainSliderItem from "./MainSliderItem";
import { useStyles } from "../../../styles/sliders/styles";
import { useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const getRandomProducts = (products, count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function MainSlider() {
  const classes = useStyles();
  const { products } = useSelector((state) => state.products);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (products?.data?.length) {
      const selectedProducts = getRandomProducts(products.data, 5);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

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
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {next && <IoIosArrowForward />}
            {prev && <IoIosArrowBack />}
          </Button>
        );
      }}
      className={classes.carouselRoot}
    >
      {randomProducts.map((item) => (
        <Box
          key={item._id}
          className="image-container"
          sx={{
            maxWidth: "calc(100% - 40px)",
            margin: "0 auto",
          }}
        >
          <MainSliderItem item={item} />
        </Box>
      ))}
    </Carousel>
  );
}

export default MainSlider;
