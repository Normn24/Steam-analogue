import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../../redux/genres.slice/genres.slice';
import { fetchProductsByGenre } from '../../redux/productsByGenre/productsByGenre.slice';

function FilterByGenres() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const genres = useSelector((state) => state.genres.genres);

  const handleClick = (genreId) => {
    console.log('Clicked Genre:', genreId);
    dispatch(fetchProductsByGenre(genreId));
  };

  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px', textAlign: 'left' }}>
        BROWSE BY GENRE
      </Typography>
      <Grid container spacing={2}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={6} md={4} key={genre._id} >
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {genre.name.toUpperCase()}
              </Typography>
              <Link to={`/products/${genre.name}`}>
                <Typography color="primary" onClick={() => handleClick(genre._id)} >View Products</Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FilterByGenres;

