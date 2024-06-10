import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { removeFromWishList } from "../../redux/wishList.slice/wishList.slice";
import WishListItem from "../WishListItem/WishListItem";
import useToken from "../../hooks/useToken";

export default function UserWishlist() {
  const dispatch = useDispatch();
  const token = useToken();
  const { wishList, loading } = useSelector((state) => state.wishList);

  const handleRemove = (id) => {
    dispatch(removeFromWishList({ id, token }));
  };

  if (loading) {
    return <h4>Loading</h4>;
  }
  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "700", marginBottom: "15px" }}
      >
        My wishlist
      </Typography>
      {wishList === null || wishList?.products?.length === 0 ? (
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
          There are 0 items on your wishlist
        </Typography>
      ) : (
        <>
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
