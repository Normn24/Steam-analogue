import React, { useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    itemPaper: {
        width: 1200,
        margin: '0 auto',
        padding: '10px',
        display: 'flex',
    },
    imgContainer: {
        flex: 1,
    },
    description: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '-100px',
    },
});

function Item({ item }) {
    const classes = useStyles();

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
            <Paper className={classes.itemPaper}>
                <div className={classes.imgContainer}>
                    <div className="img-container">
                        <img src={item.imageUrls[0]} alt={item.name} style={{ width: '100%' }} />
                    </div>
                </div>
                <div className={classes.description}>
                    <h1>{item.name}</h1>
                    <p>{item.genres.join(', ')}</p>
                    <p>{item.currentPrice}</p>
                    <Button variant="contained">Check it out!</Button>
                </div>
            </Paper>
        </div>
    );
}

export default Item;
