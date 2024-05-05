import { useEffect } from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Item from "../Item/Item";
import { fetchProducts } from "../../../../redux/products.slice/products.slice";

// import axios from "axios";
import { useStyles } from "../../../../styles";
import { useDispatch, useSelector } from "react-redux";

function Slider() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  if (status == "loading") {
    return <div>Loading...</div>;
  }
  return (
    <Carousel
      sx={{ marginTop: "40px", marginLeft: "-32px" }}
      className={classes.carouselRoot}
    >
      {products?.data?.map((item) => (
        <Box key={item._id} className="image-container">
          <Item item={item} />
        </Box>
      ))}
    </Carousel>
  );
}

export default Slider;
