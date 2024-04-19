import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from "../Item/Item"
import axios from 'axios';

function Slider() {
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
        <Carousel>
            {sliderData.map(item => <Item key={item._id} item={item} />)}
        </Carousel>
    );
}

export default Slider;
