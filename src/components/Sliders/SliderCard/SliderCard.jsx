import { fetchSlides } from "../../../redux/slides.slice/slides.slice";
import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import SliderCardItem from "./SliderCardItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCard.css";
import { useEffect } from "react";

export default function SliderCard() {
  const dispatch = useDispatch();
  const { slides } = useSelector((state) => state.slides);

  useEffect(() => {
    dispatch(fetchSlides("http://localhost:4000/api/slides"));
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
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Box sx={{ marginTop: "60px" }}>
        <Typography
          sx={{ textTransform: "capitalize", paddingLeft: "20px" }}
          variant="h5"
          component="h5"
        >
          SELECTED AND RECOMMENDED
        </Typography>
        <Slider {...settings}>
          {slides?.map((product, index) => {
            return <SliderCardItem key={index} product={product.product} />;
          })}
        </Slider>
      </Box>
    </>
  );
}
