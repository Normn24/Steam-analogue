import React, { useState, useEffect } from 'react';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Завантаження даних продукту при завантаженні компонента
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.imageUrl} alt={product.name} />
      {/* Додатковий функціонал, наприклад, кнопка "Додати в кошик" */}
    </div>
  );
};

export default ProductPage;