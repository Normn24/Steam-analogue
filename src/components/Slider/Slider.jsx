import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Item from '../Item/Item';
import axios from 'axios';
import { useStyles } from '../../styles';

function Slider() {
    const classes = useStyles();
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        async function fetchSliderData() {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setSliderData(response.data.data);
            } catch (error) {
                console.error('Error fetching slider data:', error);
            }
        }

        fetchSliderData();
    }, []);

    return (
        <Carousel
            className={classes.carouselRoot}
        >
            {sliderData.map(item => (
                <Box key={item._id} className="image-container">
                    <Item item={item} />
                </Box>
            ))}
        </Carousel>
    );
}

export default Slider;
