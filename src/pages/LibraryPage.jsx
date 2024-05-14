import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/order.slice/order.slice";
// import { Box, Typography } from "@mui/material";
// import WishListItem from "../components/WishListItem/WishListItem";

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const order = orders?.map((item) => item.products);
  console.log(order?.map((item) => item[0]));
  if (loading) {
    return <h4>Loading</h4>;
  }
  return (
    <h1>Library</h1>
    // <Box sx={{ position: "relative", minHeight: "75.3vh", margin: "40px 0" }}>
    //   {oreders === null || oreders?.products?.length === 0 ? (
    //     <Typography
    //       sx={{
    //         textAlign: "center",
    //         width: "50%",
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //       }}
    //       variant="p"
    //       component="p"
    //     >
    //       OOPS, THERE`S NOTHING TO SHOW HERE
    //       <br />
    //       There are 0 items on your wishlist, but none of them match the filters
    //       you have applied above
    //     </Typography>
    //   ) : (
    //     <>
    //       <Typography
    //         sx={{
    //           width: "auto",
    //           textTransform: "uppercase",
    //         }}
    //         variant="h4"
    //         component="h4"
    //       >
    //         Wishlist {oreders?.customerId?.login}
    //       </Typography>
    //       {oreders?.products?.map((product) => (
    //         <WishListItem
    //           key={product._id}
    //           product={product}
    //         />
    //       ))}
    //     </>
    //   )}
    // </Box>
  );
}
