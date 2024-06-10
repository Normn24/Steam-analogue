import { Box, Typography } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";

const CommentsComponent = () => {
  const productComments = useSelector(
    (state) => state.comments.productComments
  );
  return (
    <Box>
      {productComments && productComments.length === 0 && (
        <>
          <Typography
            variant="p"
            component="p"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              textAlign: "center",
            }}
          >
            There are no reviews for this product
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              textAlign: "center",
            }}
          >
            You can write your own review for this product to share your
            experience with the community. Use the area above the purchase
            buttons on this page to write your review.
          </Typography>
        </>
      )}
      {productComments.map((item) => (
        <Card
          key={item?._id}
          sx={{
            boxShadow: 5,
            borderRadius: 2,
            margin: "15px 0",
            display: "flex",
            backgroundColor: "transparent",
          }}
        >
          <CardMedia
            sx={{
              minHeight: { xs: "85px", md: "140px" },
              width: { xs: "100px", md: "140px" },
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
              padding: { xs: "2px 7px", md: "15px" },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              "&:last-child": { pb: { xs: "0", md: "15px" } },
            }}
          >
            <Typography variant="p" component="p">
              {item.customer.login}
            </Typography>
            <Typography
              sx={{
                opacity: 0.6,
                fontSize: { xs: "10px", md: "13px" },
                textTransform: "uppercase",
              }}
              variant="p"
              component="p"
            >
              Posted:{" "}
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography
              sx={{ padding: "5px 0", fontSize: { xs: "13px", md: "16px" } }}
              variant="p"
              component="p"
            >
              {item.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

const Comments = memo(CommentsComponent);
Comments.displayName = "Comments";

export default Comments;
