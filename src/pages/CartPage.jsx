import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { removeFromCart } from "../redux/cart.slice/cart.slice";
import CartListItem from "../components/CartListItem/CartListItem";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const totalPrice = cart?.products?.reduce(
    (total, product) => total + product.product.currentPrice,
    0
  );

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  if (loading) {
    return <h4>Loading</h4>;
  }
  return (
    <Box sx={{ position: "relative", minHeight: "75.3vh", margin: "40px 0" }}>
      {cart === null || cart?.products?.length === 0 ? (
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
          <br />
          There are 0 items on your wishlist, but none of them match the filters
          you have applied above
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              width: "auto",
              textTransform: "uppercase",
            }}
            variant="h4"
            component="h4"
          >
            Cart {cart?.customerId?.login}
          </Typography>
          {cart?.products?.map((item) => (
            <CartListItem
              key={item.product._id}
              product={item.product}
              handleRemove={handleRemove}
            />
          ))}
          <Box
            sx={{
              position: "absolute",
              top: "55px",
              right: 0,
              display: "flex",
              flexDirection: "column",
              width: "400px",
              boxShadow: 5,
              borderRadius: 2,
              padding: "10px",
              backgroundColor: "transparent",
              gap: "10px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  width: "auto",
                }}
                variant="h5"
                component="h5"
              >
                Estimated total:
              </Typography>
              <Typography variant="h5" component="h5">
                {totalPrice}$
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" component="h5">
                Total products:
              </Typography>
              <Typography variant="h5" component="h5">
                {cart?.products?.length}
              </Typography>
            </Box>
            <Typography variant="p" component="p">
              Sales tax will be calculated during checkout where applicable
            </Typography>
            <Button
              sx={{
                backgroundColor: "#bdbdbd",
                borderRadius: "3px",
                padding: "4.25px 8px",
                ":hover": { backgroundColor: "#cccc" },
              }}
            >
              Continue to payment
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
