import React, { useState } from 'react';
import { TextField, Button, FormControl, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts, applyFilters } from '../redux/filterSlice'; 
import './filter.css';

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Year');
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(fetchProducts()).then(() => {
            dispatch(applyFilters({ searchTerm, searchType }));
            // console.log(`Search by ${searchType} :`, searchTerm);
        });
    };

    return (
        <div className='search-form'>
            <div className='search-buttons'>
                <ButtonGroup variant="contained" aria-label="search-type">
                    <Button onClick={() => setSearchType('Name')}>Name</Button>
                    <Button onClick={() => setSearchType('Year')}>Year</Button>
                    <Button onClick={() => setSearchType('Publisher')}>Publisher</Button>
                    <Button onClick={() => setSearchType('Categories')}>Categories</Button>
                    <Button onClick={() => setSearchType('Developer')}>Developer</Button>
                    <Button onClick={() => setSearchType('Genres')}>Genres</Button>
                </ButtonGroup>
            </div>
            <div className='search-itself'>
                <FormControl>
                    <TextField
                        label={`Search by ${searchType}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </FormControl>
                <Link to="/catalogue" className="search-button">
                    <Button  variant="contained" onClick={handleSearch}>Search</Button>
                </Link>
            </div>
        </div>
    );
};

export default FilterSearch;
