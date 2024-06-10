import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { removeComment } from "../../redux/comments.slice/comments.slice";
import { MdOutlineDelete } from "react-icons/md";
import useToken from "../../hooks/useToken";

export default function UserReviews() {
  const dispatch = useDispatch();
  const token = useToken();

  const userComments = useSelector((state) => state.comments.userComments);

  const handleDeleteComment = (id) => {
    dispatch(removeComment({ id, token }));
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "700", marginBottom: "15px" }}
      >
        My Reviews ({userComments.length})
      </Typography>
      {userComments.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            width: "50%",
            position: "absolute",
            top: { xs: "65%", md: "30%" },
            left: { xs: "50%", md: "62%" },
            transform: "translate(-50%, -50%)",
          }}
          variant="p"
          component="p"
        >
          OOPS, THERE`S NOTHING TO SHOW HERE
          <br />
          Your have left 0 reviews.
        </Typography>
      ) : (
        <>
          {userComments?.map((item) => (
            <Card
              key={item._id}
              sx={{
                boxShadow: 5,
                borderRadius: 2,
                margin: "15px 0",
                display: "flex",
                backgroundColor: "transparent",
              }}
            >
              <Link className="post__more" to={`/product/${item.product._id}`}>
                <CardMedia
                  sx={{
                    minHeight: "100px",
                    height: "100%",
                    width: { xs: "100px", md: "260px" },
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
                  padding: "10px 10px 0px 16px ",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  "&:last-child": { pb: "30px" },
                }}
              >
                <Typography
                  variant="p"
                  component="p"
                  sx={{ paddingRight: "35px" }}
                >
                  {item.content}
                </Typography>
                <Button
                  onClick={() => handleDeleteComment(item._id)}
                  sx={{
                    width: "auto",
                    height: "auto",
                    minWidth: "auto",
                    p: 0,
                    position: "absolute",
                    right: "15px",
                  }}
                >
                  <MdOutlineDelete
                    style={{ width: "30px", height: "30px", color: "#000" }}
                  />
                </Button>
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: "7px",
                    right: "15px",
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
        </>
      )}
    </Box>
  );
}
