import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { removeFromWishList } from "../redux/wishList.slice/wishList.slice";
import WishListItem from "../components/WishListItem/WishListItem";

export default function WishListPage() {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);

  const handleRemove = (_id) => {
    dispatch(removeFromWishList(_id));
  };

  return (
    <Box sx={{ position: "relative", minHeight: "75.3vh", margin: "40px 0" }}>
      {wishList === null || wishList?.products?.length === 0 ? (
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
            Wishlist {wishList?.customerId?.login}
          </Typography>
          {wishList?.products?.map((product) => (
            <WishListItem
              key={product._id}
              product={product}
              handleRemove={handleRemove}
            />
          ))}
        </>
      )}
    </Box>
  );
}
