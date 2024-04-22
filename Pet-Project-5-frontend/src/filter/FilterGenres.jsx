import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterByGenre } from '../redux/filterSlice';

function FilterCategories() {
  const dispatch = useDispatch();
  // const classes = useStyles();

  const handleFilter = (genre) => {
    dispatch(fetchProducts()).then(() => {
      dispatch(filterByGenre(genre));
    });

  };

  const genres = [
    'RPG',
    'souls like',
    'dark fantasy',
    'cyberpunk',
    'Shooter',
    'open world'];

  return (
    <div style={{ width: '1170px', margin: '0 auto' }}>
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item xs={4} key={genre}>
            <Link to="/catalogue" style={{ textDecoration: 'none' }}>
              <Paper
                style={{ height: '100px', textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                onClick={() => handleFilter(genre)}
              >
                Genre: {genre}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FilterCategories;
