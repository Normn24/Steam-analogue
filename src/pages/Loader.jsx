import { useSelector } from "react-redux";
import { grid } from "ldrs";
import { Box } from "@mui/material";

export default function Loader() {
  const isLoading = useSelector((state) => state.loader.loading);
  document.body.style.overflow = "hidden";
  grid.register();

  if (!isLoading) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.body.style.overflow = "";
    return null;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: "0%",
        zIndex: 1330,
        backgroundColor: "#fff",
      }}
    >
      <l-grid
        size="160"
        speed="1"
        color="black"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1330,
        }}
      ></l-grid>
    </Box>
  );
}
