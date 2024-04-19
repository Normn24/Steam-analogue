import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products.slice/products.slice";
import ProductItem from "../ProductItem/ProductItem";
import { Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";

export default function Prodcts() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <button className="arrows arrow__prev" />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <button onClick={onClick} className="arrows arrow__next" />
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
  };

  if (status === "failed") {
    return <h1>No products 😢</h1>;
  }
  return (
    <>
      <Typography
        sx={{ textTransform: "capitalize" }}
        variant="h5"
        component="h5"
      >
        SELECTED AND RECOMMENDED
      </Typography>
      <Slider {...settings}>
        {products.data?.map((product, index) => {
          return <ProductItem key={index} product={product} />;
        })}
      </Slider>
    </>
  );
}
