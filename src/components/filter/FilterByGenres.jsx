import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box, Container, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../../redux/genres.slice/genres.slice';
import { fetchProductsByGenre } from '../../redux/productsByGenre/productsByGenre.slice';

const ScrollableContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  overflowY: 'hidden',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none', /* Firefox */
  msOverflowStyle: 'none', /* IE 11 */
  // '&::-webkit-scrollbar': {
  //   display: 'none', /* Hide scrollbar for Chrome, Safari, and Opera */
  // },
});

function FilterByGenres() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const genres = useSelector((state) => state.genres.genres);

  const handleClick = (genreId) => {
    console.log('Clicked Genre:', genreId);
    dispatch(fetchProductsByGenre(genreId));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500, 
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
        BROWSE BY GENRE
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={scrollLeft}>&lt;</button> {/* Left arrow */}
        <ScrollableContainer ref={scrollRef} maxWidth="lg">
          <Box display="flex" flexDirection="row">
            {genres.map((genre) => (
              <Box key={genre._id} minWidth="25%" marginRight="10px">
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    {genre.name.toUpperCase()}
                  </Typography>
                  <Link to={`/products/${genre.name}`}>
                    <Typography color="primary" onClick={() => handleClick(genre._id)} >View Products</Typography>
                  </Link>
                </Paper>
              </Box>
            ))}
          </Box>
        </ScrollableContainer>
        <button onClick={scrollRight}>&gt;</button> {/* Right arrow */}
      </div>
    </div>
  );
}

export default FilterByGenres;



// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Grid, Paper, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchGenres } from '../../redux/genres.slice/genres.slice';
// import { fetchProductsByGenre } from '../../redux/productsByGenre/productsByGenre.slice';

// function FilterByGenres() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchGenres());
//   }, [dispatch]);

//   const genres = useSelector((state) => state.genres.genres);

//   const handleClick = (genreId) => {
//     console.log('Clicked Genre:', genreId);
//     dispatch(fetchProductsByGenre(genreId));
//   };

//   return (
//     <div style={{ width: '1200px', margin: '0 auto' }}>
//       <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', textAlign: 'left' }}>
//         BROWSE BY GENRE
//       </Typography>
//       <Grid container spacing={2}>
//         {genres.map((genre) => (
//           <Grid item xs={12} sm={6} md={4} key={genre._id} >
//             <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
//               <Typography variant="h6" gutterBottom>
//                 {genre.name.toUpperCase()}
//               </Typography>
//               <Link to={`/products/${genre.name}`}>
//                 <Typography color="primary" onClick={() => handleClick(genre._id)} >View Products</Typography>
//               </Link>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }

// export default FilterByGenres;

