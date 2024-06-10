import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import LibraryItem from "../components/LibraryItem/LibraryItem";

export default function LibraryPage() {
  const { orders, library } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user.user);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 302px)",
        margin: "40px 20px",
      }}
    >
      {orders === null || library.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            width: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          variant="p"
          component="p"
        >
          OOPS, THERE`S NOTHING TO SHOW HERE
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              width: "auto",
              textTransform: "uppercase",
              pl: { xs: 0, md: "20px" },
              textAlign: { xs: "center", md: "left" },
            }}
            variant="h4"
            component="h4"
          >
            Library {user?.login}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: "15px",
            }}
          >
            {library?.map((item) =>
              item?.map((product) => (
                <LibraryItem key={product?._id} product={product} />
              ))
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
