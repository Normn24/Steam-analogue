import Prodcts from "../components/Products/Products";
import SliderCard from "../components/Sliders/SliderCard/SliderCard";
import MainSlider from "../components/Sliders/MainSlider/MainSlider";
// import FilterByGenre from "../components/Filter/FilterByGenre";
import GenresSlider from "../components/Sliders/GenresSlider/GenresSlider";

export default function MainPage() {
  return (
    <>
      <MainSlider />
      <SliderCard />
      <GenresSlider />
      {/* <FilterByGenre /> */}
      <Prodcts />
    </>
  );
}
