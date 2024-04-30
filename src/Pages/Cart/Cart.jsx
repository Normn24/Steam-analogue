import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/products.slice/products.slice';
import ProductItem from '../../components/ProductItem/ProductItem';

function Cart() {
  const { products, status } = useSelector((state) => state.products);
  const {carts} = useSelector((state) => state.carts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts("http://localhost:4000/api/products/"));
  }, [dispatch]);

const cart = products?.data?.filter((item) => {
   return carts.includes(item._id)
}) || []



  return (
    <section>
      <h1>Cart</h1>
      <div>
      {cart.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default Cart
