import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '../../store/catalogSlice';

function Catalog() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog("Popular"));
  }, []);

  const categories = useSelector((state) => state.catalog.categories);
  console.log('categories', categories);

  return (
    <div style={{ width: '1200px', margin: '0 auto' }}>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={3} key={category}>
            <Link to="/catalogue" style={{ textDecoration: 'none' }}>
              <Paper
                style={{ height: '100px', textAlign: 'center', padding: '20px', cursor: 'pointer' }}
                // onClick={() => handleClick(category)}
              >
                Name: {category}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Catalog;
