import { fetchSlides } from "../../../redux/slides.slice/slides.slice";
import { Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import SliderCardItem from "./SliderCardItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "../../../styles/sliders/SliderCard.scss";

export default function SliderCard() {
  const dispatch = useDispatch();
  const { slides } = useSelector((state) => state.slides);

  useEffect(() => {
    dispatch(fetchSlides());
  }, [dispatch]);

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <Box onClick={onClick} className={`arrow ${className}`}>
        <Button
          className="arrows"
          sx={{
            opacity: 1,
            background: "none",
            borderRadius: 0,
            color: "var(--text-color)",
            fontSize: "80px",
            top: "-30px",
          }}
        >
          <IoIosArrowBack />
        </Button>
      </Box>
    );
  }

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <Box onClick={onClick} className={`arrow ${className}`}>
        <Button
          sx={{
            opacity: 1,
            background: "none",
            borderRadius: 0,
            color: "var(--text-color)",
            fontSize: "80px",
            top: "-30px",
          }}
        >
          <IoIosArrowForward />
        </Button>
      </Box>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Box sx={{ margin: "60px auto 0", width: "auto" }}>
        <Typography
          sx={{
            textTransform: "uppercase",
            paddingLeft: { xs: 0, md: "20px" },
            textAlign: { xs: "center", md: "left" },
          }}
          variant="h5"
          component="h5"
        >
          special offers
        </Typography>
        <Slider {...settings}>
          {slides?.slice(0, 6).map((product, index) => {
            return <SliderCardItem key={index} product={product.product} />;
          })}
        </Slider>
      </Box>
    </>
  );
}
