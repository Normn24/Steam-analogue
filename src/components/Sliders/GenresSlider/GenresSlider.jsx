import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { fetchGenres } from "../../../redux/genres.slice/genres.slice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function GenresSlider() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.genres);

  useEffect(() => {
    dispatch(fetchGenres());
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
    slidesToShow: 4,
    slidesToScroll: 2,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Box
        sx={{
          margin: "60px auto 0",
          width: "auto",
        }}
      >
        <Typography
          sx={{ textTransform: "capitalize", paddingLeft: "20px" }}
          variant="h5"
          component="h5"
        >
          BROWSE BY GENRE
        </Typography>
        <Slider {...settings}>
          {genres?.slice(0, 8).map((genre) => (
            <NavLink
              to={`/products/search/?genre=${genre._id}`}
              key={genre._id}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "270px",
                  margin: "20px",
                  width: "280px !important",
                  textAlign: "center",
                  borderRadius: "8px",
                  backgroundImage: `url(${genre.imageUrls}) `,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  boxShadow: 10,
                  transition: "all .2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: "8px",
                    background: `linear-gradient( rgba(0,0,0,0), ${genre.color} 100%);`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      position: "absolute",
                      bottom: "10px",
                      width: "100%",
                      left: "50%",
                      transform: "translate(-50%, 0%)",
                    }}
                  >
                    {genre.name.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </NavLink>
          ))}
        </Slider>
      </Box>
    </>
  );
}
