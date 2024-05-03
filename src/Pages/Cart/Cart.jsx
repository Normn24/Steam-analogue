import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/products.slice/products.slice";
import CartItem from "./CartItem";

function Cart() {
  const { products, status } = useSelector((state) => state.products);
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

  const cart =
    products?.data?.filter((item) => {
      return carts.includes(item._id);
    }) || [];

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cart.reduce((total, product) => total + product.currentPrice, 0);

  return (
    <section>
      <h1>Cart</h1>
      <div className="total">
        <strong>
          Total: <span>{totalQuantity}</span>
        </strong>
        <strong>
          Total Price: <span>${totalPrice.toFixed(2)} </span>{" "}
        </strong>
      </div>
      <div>
        {cart.map((product) => (
          <CartItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Cart;
