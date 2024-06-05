import { useState } from "react";
import { Paper } from "@mui/material";
import { useStyles } from "../../../styles/sliders/styles";
import { Link } from "react-router-dom";

function MainSliderItem({ item }) {
  const classes = useStyles();
  const [mainImage, setMainImage] = useState(item.imageUrls[4]);

  const handleThumbnailClick = (index) => {
    setMainImage(item.imageUrls[index]);
  };

  return (
    <div>
      <Link className="post__more" to={`/product/${item._id}`}>
        <Paper
          sx={{
            boxShadow: 15,
            borderRadius: 2,
          }}
          className={classes.itemPaper}
        >
          <div className={classes.imgContainer}>
            {item?.imageUrls.slice(0, 4).map((imageUrl, index) => (
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
            <h1
              style={{
                margin: "0 0 16px",
                fontSize: "42px",
              }}
            >
              {item?.name}
            </h1>
            <img
              src={mainImage}
              alt={item.name}
              className={classes.fullSizeImage}
            />
            <div className={classes.genreContainer}>
              {item?.genres.map((genre, index) => (
                <div
                  key={index}
                  style={{ padding: "7px 9px" }}
                  className={classes.genreItem}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
        </Paper>
      </Link>
    </div>
  );
}

export default MainSliderItem;
