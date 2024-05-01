import React, { useState } from 'react';
import { Paper, Button } from '@mui/material';
import { useStyles } from '../../styles';

function Item({ item }) {
    const classes = useStyles();
    const [thumbnailIndex, setThumbnailIndex] = useState(0);
    const [mainImage, setMainImage] = useState(item.imageUrls[4]);

    const handleThumbnailClick = (index) => {
        setThumbnailIndex(index);
        setMainImage(item.imageUrls[index]);
    };

    return (
        <div>
            <Paper className={classes.itemPaper}>
                <div className={classes.imgContainer}>
                    {item.imageUrls.slice(0, 4).map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={item.name}
                            className={classes.imgItem}
                            onMouseEnter={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
                <div className={classes.description}>
                    <h1>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
                    <img
                        src={mainImage}
                        alt={item.name}
                        className={classes.fullSizeImage}
                    />
                    <div className={classes.genreContainer}>
                        {item.genres.map((genre, index) => (
                            <div key={index} className={classes.genreItem}>
                                {genre}
                            </div>
                        ))}
                    </div>
                    <Button variant="contained">Посмотреть</Button>
                </div>
            </Paper>
        </div>
    );
}

export default Item;
