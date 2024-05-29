import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductPageSlider.css";

export default function ProductPageSlider({ product }) {
  const settings = {
    customPaging: function (i) {
      return (
        <img
          style={{ width: "135.5px", height: "100%", objectFit: "cover" }}
          src={product ? product[i] : ""}
          alt={product}
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="slider-items">
        {product?.map((item, index) => {
          return <img key={index} src={item} className="slider-item" />;
        })}
      </Slider>
    </div>
  );
}
