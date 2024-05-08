import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Slider, Typography } from '@mui/material';
import './filter.css'

function FilterPanel() {
    const [gameName, setGameName] = useState('');
    const [yearRange, setYearRange] = useState([2010, 2024]);
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [ratingRange, setRatingRange] = useState([0, 100]);
    const [priceRange, setPriceRange] = useState([100, 1000]);
    const [genre, setGenre] = useState('');

    const handleSearch = () => {
        console.log("Searching...");
        //request fetch / create async thunk
    };

    return (
        <div style={{ width: '300px', padding: '20px', borderRight: '1px solid #ccc' }}>

            <TextField
                label="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Typography id="year-slider" gutterBottom>
                Year Range
            </Typography>

            <Slider
                value={yearRange}
                onChange={(e, newValue) => setYearRange(newValue)}
                min={2010}
                max={2024}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
            
            <div className='value-range'>
                <Typography gutterBottom>
                    Min Year: {yearRange[0]}
                </Typography>
                <Typography gutterBottom>
                    Max Year: {yearRange[1]}
                </Typography>
            </div>


            <TextField
                label="Developer"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Typography id="rating-slider" gutterBottom>
                Rating Range
            </Typography>

            <Slider
                value={ratingRange}
                onChange={(e, newValue) => setRatingRange(newValue)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />

            <div className='value-range'>
                <Typography gutterBottom>
                    Min Rating: {ratingRange[0]}
                </Typography>
                <Typography gutterBottom>
                    Max Rating: {ratingRange[1]}
                </Typography>
            </div>

            <Typography id="price-slider" gutterBottom>
                Price Range
            </Typography>

            <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                min={100}
                max={1000}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />

            <div className='value-range'>
                <Typography gutterBottom>
                    Min Price: ₴{priceRange[0]}
                </Typography>
                <Typography gutterBottom>
                    Max Price: ₴{priceRange[1]}
                </Typography>
            </div>

            <FormControl fullWidth margin="normal">
                <InputLabel>Genre</InputLabel>
                <Select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="RPG">RPG</MenuItem>
                    <MenuItem value="Shooter">Shooter</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                    <MenuItem value="Fighting">Fighting</MenuItem>
                    <MenuItem value="Racing">Racing</MenuItem>
                    <MenuItem value="Sports-playing">Sports</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
                Search
            </Button>
        </div>
    );
};

export default FilterPanel;
