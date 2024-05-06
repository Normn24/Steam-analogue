import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/products.slice/products.slice';
import { fetchGenres } from '../../redux/genres.slice/genres.slice';

function FilterByGenres() {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const products = useSelector((state) => state.products.products)
  const genres = useSelector((state) => state.genres.genres);

  console.log('g', genres);

  // const handleFilter = (genre) => {
  //   const filtered = products.filter((product) =>
  //     product.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
  //   );
  //   setFilteredProducts(filtered);
  // };

  // console.log('filtered products by genre', filteredProducts);

  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', textAlign: 'left' }}>
        BROWSE BY GENRE
      </Typography>
      <Grid container spacing={2}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={6} md={4} key={genre._id}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {genre.name.toUpperCase()}
              </Typography>
              <Link to={`/products/${genre._id}`}>
                <Typography color="primary">View Products</Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FilterByGenres;







// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Grid, Paper } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../store/filterSlice';

// function FilterCategories() {
//   // const dispatch = useDispatch();
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // useEffect(() => {
//   //   dispatch(fetchProducts());
//   // }, []);

//   const products = useSelector((state) => state.filter.products);
//   const genres = useSelector((state) => state.filter.genres);

//   // useEffect(() => {
//   //   console.log('p', products);
//   //   console.log('g', genres);
//   // }, [products])

//   const handleFilter = (genre) => {
//     const filtered = products.filter((product) =>
//       product.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
//     );
//     setFilteredProducts(filtered);
//   };

//   console.log('filteredProducts by genre', filteredProducts);

//   return (
//     <div style={{ width: '1200px', margin: '0 auto' }}>
//       <Grid container spacing={3}>
//         {genres.map((genre) => (
//           <Grid item xs={4} key={genre}>
//             <Link to="/catalogue" style={{ textDecoration: 'none' }}>
//               <Paper
//                 style={{ height: '100px', textAlign: 'center', padding: '20px', cursor: 'pointer' }}
//                 onClick={() => handleFilter(genre)}
//               >
//                 Genre: {genre}
//               </Paper>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default FilterCategories;
