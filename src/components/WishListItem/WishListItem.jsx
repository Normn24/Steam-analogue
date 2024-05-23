import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { removeFromCart, addToCart } from "../../redux/cart.slice/cart.slice";
export default function WishListItem({ product, handleRemove }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    _id,
    name,
    imageUrls,
    genres,
    currentPrice,
    yearOfPublication,
    developer,
    previousPrice,
  } = product;
  const { cart } = useSelector((state) => state.cart);
  const [onCart, setOnCart] = useState(false);

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

  useEffect(() => {
    if (cart?.products?.some((item) => item?.product?._id === product._id)) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
  }, [cart, product]);

  const handleCartList = (_id) => {
    if (onCart) {
      dispatch(removeFromCart(_id));
    } else {
      dispatch(addToCart(_id));
    }
  };

  return (
    <Card
      sx={{
        width: "auto",
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
          height: "140px",
          width: "500px",
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
              component="h4"
            >
              {name}
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize" }}
              variant="p"
              component="p"
            >
              Release Date: {dateOfPublication}
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize" }}
              variant="p"
              component="p"
            >
              Developer: {developer}
            </Typography>
          </Link>

          <List
            sx={{
              display: "flex",
              maxWidth: "50%",
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            {genres.slice(0, 3).map((value, index) => (
              <ListItem
                key={index}
                sx={{
                  width: "auto",
                  padding: "0",
                  textTransform: "capitalize",
                }}
                disableGutters
              >
                <ListItemText
                  className={classes.genreItem}
                  sx={{
                    margin: "0",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    backgroundColor: "transparent",
                  }}
                  primary={value.name}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: previousPrice ? "flex-end" : "center",
              backgroundColor: "#cccc",
              justifyContent: "space-between",
              padding: "3px 3px 3px 10px",
              borderRadius: "3px",
              gap: "10px",
              position: "relative",
            }}
          >
            {previousPrice ? (
              <>
                <Typography
                  sx={{
                    fontSize: "24px",
                    lineHeight: "1",
                    backgroundColor: "#4c6b22",
                    padding: "8.25px 3px",
                    color: "#BDED11",
                    position: "absolute",
                    top: "0px",
                    left: "-37%",
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
                    left: "11%",
                    fontSize: "12px",
                    bottom: "18px",
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
              </>
            ) : (
              <Typography variant="p" component="p">
                {currentPrice}$
              </Typography>
            )}
            <Button
              onClick={() => handleCartList(product?._id)}
              sx={{
                width: "105px",
                padding: "5px 12px  ",
                textTransform: "initial",
                backgroundColor: "#bdbdbd",
                borderRadius: "3px",
              }}
            >
              {onCart ? "In cart" : "Add to cart"}
            </Button>
          </Box>
          <Button
            sx={{
              backgroundColor: "#bdbdbd",
              borderRadius: "3px",
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

WishListItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yearOfPublication: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};
