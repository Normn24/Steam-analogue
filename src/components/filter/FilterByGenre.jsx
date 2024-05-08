import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../../redux/genres.slice/genres.slice';
import { fetchProductsByGenre } from '../../redux/productsByGenre/productsByGenre.slice';
import { ScrollableContainer, StyledPaper } from './FilterByGenreStyled';

function FilterByGenres() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const genres = useSelector((state) => state.genres.genres);

  const handleClick = (genreId) => {
    // console.log('Clicked Genre:', genreId);
    dispatch(fetchProductsByGenre(genreId));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -310, 
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 310, 
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
              <Box key={genre._id} minWidth="20%" marginRight="10px">
                <StyledPaper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    {genre.name.toUpperCase()}
                  </Typography>
                  <Link to={`/products/${genre.name}`}>
                    <Typography color="primary" onClick={() => handleClick(genre._id)}>View Products</Typography>
                  </Link>
                </StyledPaper>
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
