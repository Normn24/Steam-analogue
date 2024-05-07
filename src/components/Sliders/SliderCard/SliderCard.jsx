import { fetchSlides } from "../../../redux/slides.slice/slides.slice";
import { Typography, Box } from "@mui/material";
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
      <div onClick={onClick} className={`arrow ${className}`}>
        <button className="arrows">
          <IoIosArrowBack />
        </button>
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <button onClick={onClick} className="arrows">
          <IoIosArrowForward />
        </button>
      </div>
    );
  }
  const settings = {
    dots: false,
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
