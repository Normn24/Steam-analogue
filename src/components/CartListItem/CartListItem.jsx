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
import PriceBox from "../PriceBox/PriceBox";

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
        width: { xs: "auto", md: "60%" },
        boxShadow: 5,
        borderRadius: 2,
        margin: "15px 0",
        padding: "10px",
        display: "flex",
        backgroundColor: "transparent",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <CardMedia
        sx={{
          height: "100px",
          width: { xs: "auto", md: "300px" },
          objectFit: "cover",
          borderRadius: { xs: "6px", md: "6px 0px 0px 6px" },
        }}
        image={imageUrls[0]}
        title={name}
      />
      <CardContent
        sx={{
          width: "100%",
          minHeight: 83,
          padding: { xs: "0", md: "0px 0px 0px 16px " },
          position: "relative",
          flexDirection: { xs: "column", md: "row" },
          display: "flex",
          justifyContent: "space-between",
          "&:last-child": { pb: 0 },
        }}
      >
        <Box sx={{ width: { xs: "auto", md: "70%" } }}>
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
            flexDirection: { xs: "row", md: "column" },
            justifyContent: { xs: "space-between", md: "space-around" },
            width: { xs: "auto ", md: "120px" },
            mt: { xs: "5px", md: "0" },
          }}
        >
          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            showButton={false}
            sliderItem={true}
            position="absolute"
            additionalStyles={{
              display: "flex",
              gap: "8px",
              alignItems: "baseline",
              position: "relative",
              padding: "0 4px 0 0",
              backgroundColor: "#cccc",
              width: "auto",
              borderRadius: "4px",
              justifyContent: previousPrice ? "space-between" : "center",
              fontSize: !previousPrice && "23px",
            }}
          />
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
