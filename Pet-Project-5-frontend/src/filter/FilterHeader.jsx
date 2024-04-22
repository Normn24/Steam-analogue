import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchProducts, filterByGenre } from '../redux/filterSlice';

const FilterHeader = () => {
    const dispatch = useDispatch();

    const handleFilter = (genre) => {
        dispatch(fetchProducts()).then(() => {
          dispatch(filterByGenre(genre));
        });
    }
    
    const genres = [
        'RPG',
        'souls like',
        'dark fantasy',
        'cyberpunk',
        'Shooter',
        'open world',
        'single-player',
        'action'
    ];

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
