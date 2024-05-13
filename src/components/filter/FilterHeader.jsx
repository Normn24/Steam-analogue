import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/filterSlice';

const FilterHeader = () => {

    // const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    // useEffect(() => {
    //   dispatch(fetchProducts());
    // }, []);
  
    const products = useSelector((state) => state.filter.products);
    const genres = useSelector((state) => state.filter.genres);
    
    const handleFilter = (genre) => {
      const filtered = products.filter((product) =>
        product.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
      );
      setFilteredProducts(filtered);
    };
  
    console.log('filteredProducts by genre', filteredProducts);
  
    return (
        <div style={{
            width: '1170px',
            height: '55px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {genres.map((genre) => (
                <div key={genre} style={{ height: '100%', flexGrow: 1 }}>
                    <Link to="/catalogue" style={{ textDecoration: 'none' }}>
                        <Paper
                            style={{ padding: '15px' }}
                            onClick={() => handleFilter(genre)}
                        >
                            {genre}
                        </Paper>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default FilterHeader;
