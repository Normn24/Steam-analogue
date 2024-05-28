// import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";

export default function Comments({ item }) {
  console.log(item);
  return (
    <Box>
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          margin: "15px 0",
          padding: "15px",
          display: "flex",
          backgroundColor: "transparent",
        }}
      >
        <CardMedia
          sx={{
            minHeight: "100px",
            width: "140px",
            objectFit: "cover",
            borderRadius: "6px 0px 0px 6px",
          }}
          image={item.product.imageUrls[Math.floor(Math.random() * 5)]}
          title={item.product.name}
        />
        <CardContent
          sx={{
            width: "100%",
            minHeight: 83,
            padding: "0 0 0 15px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography variant="p" component="p">
            {item.customer.login}
          </Typography>
          <Typography
            sx={{
              opacity: 0.6,
              fontSize: "13px",
              textTransform: "uppercase",
            }}
            variant="p"
            component="p"
          >
            Posted:
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
          <Typography sx={{ padding: "5px 0" }} variant="p" component="p">
            {item.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
