import { fetchSlides } from "../../../redux/slides.slice/slides.slice";
import { Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import SliderCardItem from "./SliderCardItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCard.css";
import { useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function SliderCard() {
  const dispatch = useDispatch();
  const { slides } = useSelector((state) => state.slides);

  useEffect(() => {
    dispatch(fetchSlides("http://localhost:4000/api/slides"));
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
            color: "#000",
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
            color: "#000",
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
  };

  return (
    <>
      <Box sx={{ margin: "60px auto 0", width: "auto" }}>
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
