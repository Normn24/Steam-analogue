import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function CartListItem({ product, handleRemove }) {
  const {
    _id,
    name,
    imageUrls,
    currentPrice,
    yearOfPublication,
    developer,
    previousPrice,
  } = product;

  // const previousPrice = 520;

  const percent = previousPrice
    ? Math.floor((currentPrice * 100) / previousPrice)
    : null;
  const dateOfPublication = new Date(yearOfPublication).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card
      sx={{
        width: "60%",
        boxShadow: 5,
        borderRadius: 2,
        margin: "15px 0",
        padding: "10px",
        display: "flex",
        backgroundColor: "transparent",
      }}
    >
      <CardMedia
        sx={{
          height: "100px",
          width: "300px",
          objectFit: "cover",
          borderRadius: "6px 0px 0px 6px",
        }}
        image={imageUrls[0]}
        title={name}
      />
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
        <Box sx={{ width: "70%" }}>
          <Link className="post__more" to={`/product/${_id}`}>
            <Typography
              sx={{ textTransform: "capitalize" }}
              variant="h5"
              component="h5"
            >
              {name}
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize", fontSize: "14px" }}
              variant="p"
              component="p"
            >
              Release Date: {dateOfPublication}
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize", fontSize: "14px" }}
              variant="p"
              component="p"
            >
              Developer: {developer}
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "120px",
          }}
        >
          {previousPrice ? (
            <Box
              sx={{
                display: "flex",
                gap: "11px",
                alignItems: "baseline",
                position: "relative",
                paddingRight: "4px",
                backgroundColor: "#cccc",
                width: "fit-content",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "1",
                  backgroundColor: "#4c6b22",
                  padding: "6px 3px 3px",
                  color: "#BDED11",
                  borderRadius: "4px 0 0 4px",
                }}
                variant="p"
                component="p"
              >
                -{percent}%
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  right: "4.5%",
                  fontSize: "12px",
                  bottom: "16px",
                  color: "#647984",
                  textDecorationLine: "line-through",
                }}
                variant="p"
                component="p"
              >
                {previousPrice}$
              </Typography>
              <Typography
                sx={{
                  color: "#4c6b22",
                }}
                variant="p"
                component="p"
              >
                {currentPrice}$
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "23px",
                textAlign: "center",
                backgroundColor: "#cccc",
                borderRadius: "4px",
              }}
              variant="p"
              component="p"
            >
              {currentPrice}$
            </Typography>
          )}

          <Button
            sx={{
              backgroundColor: "#bdbdbd",
              borderRadius: "3px",
              padding: "4.25px 8px",
              ":hover": { backgroundColor: "#cccc" },
            }}
            onClick={() => handleRemove(_id)}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

CartListItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yearOfPublication: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};
