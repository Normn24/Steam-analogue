import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import axios from 'axios';

function Item() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/products');
            setItems(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            {items.map((item) => (
                <Paper key={item._id} className="ItemPaper" style={{ width: 1200, margin: '0 auto', padding: '10px', display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <div className="img-container">
                            <img src={item.imageUrls[0]} alt={item.name} style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '-100px' }}>
                        <div className="description">
                            <h1>{item.name}</h1>
                            <p>{item.genres.join(', ')}</p>
                            <p>{item.currentPrice}</p>
                            <Button className="CheckButton" variant="contained">
                                Check it out!
                            </Button>
                        </div>
                    </div>
                </Paper>
            ))}
        </div>
    );
}

export default Item;