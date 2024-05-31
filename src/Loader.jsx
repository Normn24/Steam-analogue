import { useSelector } from "react-redux";
import { grid } from "ldrs";

export default function Loader() {
  const isLoading = useSelector((state) => state.loader.loading);

  if (!isLoading) return null;

  grid.register();

  return (
    <l-grid
      size="160"
      speed="1"
      color="black"
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        width: "400px",
        zIndex: 1330,
      }}
    ></l-grid>
  );
}
