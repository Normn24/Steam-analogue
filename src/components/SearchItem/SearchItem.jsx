import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ImageListItem,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function SearchItem({ product, hoveredItem, handleMouseEnter }) {
  const classes = useStyles();
  const { _id, name, imageUrls, genres, currentPrice } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageUrls]);

  return (
    <Link
      className="post__more"
      to={`/product/${_id}`}
      style={{ position: "relative" }}
    >
      <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        onMouseLeave={() => handleMouseEnter("")}
        sx={{
          boxShadow: 5,
          borderRadius: 2,
          margin: "0",
          marginBottom: "15px",
          display: "flex",
          paddingRight: hoveredItem === product._id ? "24px" : "0",
          backgroundColor:
            hoveredItem === product._id ? "#bdbdbd" : "transparent",
        }}
      >
        <CardMedia
          sx={{ height: "auto", width: "300px", objectFit: "cover" }}
          image={imageUrls[0]}
          title={name}
        />
        <CardContent
          sx={{
            width: "100%",
            minHeight: 83,
            padding: "5px 16px",
            position: "relative",
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography
            sx={{ textTransform: "capitalize" }}
            variant="h4"
            component="h4"
          >
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              maxWidth: "50%",
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              columnGap: "15px",
              overflow: "hidden",
              backgroundColor:
                hoveredItem === product._id ? "#bdbdbd" : "transparent",
            }}
          >
            {genres.map((value) => (
              <ListItem
                sx={{
                  width: "auto",
                  padding: "0",
                  textTransform: "capitalize",
                }}
                key={value._id}
                disableGutters
              >
                <ListItemText
                  className={classes.genreItem}
                  sx={{
                    margin: "0",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    backgroundColor:
                      hoveredItem === product._id ? "transparent" : "",
                    border:
                      hoveredItem === product._id
                        ? "1px solid #000"
                        : "1px solid transparent ",
                  }}
                  primary={value.name}
                />
              </ListItem>
            ))}
          </List>
          <Typography
            sx={{
              position: "absolute",
              right: "16px",
              bottom: "11px",
            }}
            variant="p"
            component="p"
          >
            {currentPrice}$
          </Typography>
        </CardContent>
      </Card>
      <Collapse
        sx={{
          position: "absolute",
          right: "-43.5%",
          top: "-25%",
          width: "40.5%",
          backgroundColor: "#bdbdbd",
          borderRadius: 2,
          opacity: 1,
          zIndex: 5,
        }}
        in={hoveredItem == product._id}
        timeout="auto"
      >
        <Typography
          sx={{
            padding: "10px 15px 0",
            textTransform: "capitalize",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="h5"
          component="h5"
        >
          {name}
        </Typography>

        <List sx={{ padding: 0 }}>
          <ImageListItem
            key={imageUrls[currentImageIndex]}
            sx={{
              padding: "0 15px 20px",
              transition: "all 2.2s",
            }}
          >
            <img
              srcSet={imageUrls[currentImageIndex]}
              src={imageUrls[currentImageIndex]}
              alt={imageUrls[currentImageIndex]}
              loading="lazy"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                opacity: "1",
              }}
            />
          </ImageListItem>
        </List>
      </Collapse>
    </Link>
  );
}

SearchItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  // hoveredItem: PropTypes.string,
  // handleMouseEnter: PropTypes.func.isRequired,
};
