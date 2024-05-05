import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/filterSlice';
import { fetchGenres } from '../../store/genresSlice';

function FilterGenres() {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts())
  })

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  const products = useSelector((state) => state.filter.products)
  const genres = useSelector((state) => state.genres.genres);

  // const handleFilter = (genre) => {
  //   const filtered = products.filter((product) =>
  //     product.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
  //   );
  //   setFilteredProducts(filtered);
  // };

  // console.log('filtered products by genre', filteredProducts);

  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>
      <Grid container spacing={3}>
        {genres.map((item) => (
          <Grid item xs={4} key={item}>
            {/* <Link to="/catalogue" style={{ textDecoration: 'none' }}> */}
              <Paper
                style={{ height: '100px', textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                // onClick={() => handleFilter(genre)}
              >
                Genre: {item}
              </Paper>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FilterGenres;







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
