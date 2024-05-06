import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/products.slice/products.slice";
import CartItem from "./CartItem/CartItem";
import { Grid } from "@mui/material";

function Cart() {
  const { products, status } = useSelector((state) => state.products);
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  // const cart =
  //   products?.data?.filter((item) => {
  //     return carts.includes(item._id);
  //   }) || [];

  const totalQuantity = carts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = carts.reduce(
    (total, product) => total + product.currentPrice * product.quantity,
    0
  );

  return (
    <section>
      <div className="total">
        <strong>
          Total: <span>{totalQuantity}</span>
        </strong>
        <strong>
          Total Price: <span>${totalPrice.toFixed(2)} </span>{" "}
        </strong>
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 12 }}
      >
        {carts.map((product, index) => (
          <Grid item xs={2} sm={2} md={4} key={product._id}>
           <CartItem  product={product} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

export default Cart;
