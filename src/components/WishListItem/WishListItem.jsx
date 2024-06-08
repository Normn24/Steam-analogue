import PropTypes from "prop-types";
import useToken from "../../hooks/useToken";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../../redux/cart.slice/cart.slice";
import { useStyles } from "../../styles/sliders/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  Button,
  Box,
} from "@mui/material";
import PriceBox from "../PriceBox/PriceBox";
export default function WishListItem({ product, handleRemove }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useToken();
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

  const handleCartList = (id) => {
    if (onCart) {
      dispatch(removeFromCart({ id, token }));
    } else {
      dispatch(addToCart({ id, token }));
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
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <CardMedia
        sx={{
          height: "140px",
          width: { xs: "auto", md: "500px" },
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
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          "&:last-child": { pb: 0 },
        }}
      >
        <Box sx={{ width: { xs: "auto", md: "70%" } }}>
          <NavLink className="post__more" to={`/product/${_id}`}>
            <Typography
              sx={{
                textTransform: "capitalize",
                mt: { xs: "5px", md: "0" },
                fontSize: { xs: "20px", md: "24px" },
              }}
              variant="h5"
              component="h4"
            >
              {name}
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "14px", md: "16px" },
              }}
              variant="p"
              component="p"
            >
              Release Date: {dateOfPublication}
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "14px", md: "16px" },
              }}
              variant="p"
              component="p"
            >
              Developer: {developer}
            </Typography>
          </NavLink>

          <List
            sx={{
              display: "flex",
              maxWidth: { xs: "100%", md: "50%" },
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            {genres.slice(0, 3).map((value) => (
              <NavLink
                to={`/products/search/?genre=${value._id}`}
                key={value._id}
              >
                <Button
                  className={classes.genreItem}
                  sx={{
                    margin: "0",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    background: "#cccc",

                    color: "#000",
                    "&:hover": {
                      background: "#cccc",
                    },
                  }}
                >
                  {value.name}
                </Button>
              </NavLink>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: { xs: "8px", md: "0" },
            alignItems: { xs: "flex-end" },
          }}
        >
          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            onCart={onCart}
            handleCartList={handleCartList}
            productId={product?._id}
            loggedIn={true}
          />
          <Button
            sx={{
              minWidth: "153px",
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
