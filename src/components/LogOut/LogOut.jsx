import { Typography, Box, Button } from "@mui/material";
import { persistor } from "../../redux/store";

export default function Logout({ handleClose }) {
  const handleLogout = () => {
    persistor.purge();
    window.location.href = "/";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: "200px",
          boxShadow: 24,
          p: 4,
          borderRadius: "6px",
          backgroundColor: "rgba(17, 24, 39, 1)",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", color: "#fff" }}
        >
          Are you sure?
        </Typography>
        <Box sx={{ display: "flex", gap: "40px", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(167, 139, 250, 1)",
              textAlign: "center",
              color: "rgba(17, 24, 39, 1)",
              border: "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
}
