import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export default function UserReviews() {
  const comments = useSelector((state) => state.comments.comments);
  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "700", marginBottom: "15px" }}
      >
        My Reviews
      </Typography>
      {comments?.map((item) => (
        <Card
          key={item._id}
          sx={{
            boxShadow: 5,
            borderRadius: 2,
            margin: "15px 0",
            padding: "10px",
            display: "flex",
            backgroundColor: "transparent",
          }}
        >
          <Link className="post__more" to={`/product/${item.product._id}`}>
            <CardMedia
              sx={{
                minHeight: "100px",
                height: "100%",
                width: "300px",
                objectFit: "cover",
                borderRadius: "6px 0px 0px 6px",
              }}
              image={item.product.imageUrls[0]}
              title={item.product.name}
            />
          </Link>
          <CardContent
            sx={{
              width: "100%",
              minHeight: 83,
              padding: "0px 0px 0px 16px ",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              "&:last-child": { pb: 0 },
            }}
          >
            <Typography
              sx={{ paddingBottom: "20px" }}
              variant="p"
              component="p"
            >
              {item.content}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                opacity: 0.6,
                fontSize: "13px",
              }}
              variant="p"
              component="p"
            >
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
