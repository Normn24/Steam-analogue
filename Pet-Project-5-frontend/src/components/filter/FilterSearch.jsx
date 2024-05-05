import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch,  useSelector } from 'react-redux';
import { fetchProducts} from '../../store/filterSlice'; 
import './filter.css';

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Name');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
      }, []);
    const products = useSelector((state) => state.filter.products);

    const applyFilters = () => {
        return products.filter(product => {
            switch (searchType) {
                case 'Name':
                    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
                case 'Categories':
                    return product.categories.toLowerCase().includes(searchTerm.toLowerCase());
                case 'Publisher':
                    return product.publisher.toLowerCase().includes(searchTerm.toLowerCase());
                case 'Developer':
                    return product.developer.toLowerCase().includes(searchTerm.toLowerCase());
                case 'Year':
                    return product.yearOfPublication.includes(searchTerm);
                case 'Genres':
                    return product.genres.some(genre =>
                        genre.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                default:
                    return true;
            }
        });
    };

    const handleSearch = () => {
        const filteredProducts = applyFilters();
        console.log('Filtered products:', filteredProducts);
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
