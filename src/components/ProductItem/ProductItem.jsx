import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/sliders/styles";
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
import { memo } from "react";
import PriceBox from "../PriceBox/PriceBox";

const ProductItem = ({ product, hoveredItem, handleMouseEnter }) => {
  const { _id, name, imageUrls, genres, currentPrice, previousPrice } = product;

  const classes = useStyles();

  return (
    <Link className="post__more" to={`/product/${_id}`}>
      <Card
        onMouseEnter={() => handleMouseEnter(product._id)}
        sx={{
          width: "70%",
          boxShadow: 5,
          borderRadius: 2,
          margin: "10px 0",
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
            variant="h5"
            component="h5"
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

          <PriceBox
            previousPrice={previousPrice}
            currentPrice={currentPrice}
            showButton={false}
            position="absolute"
            additionalStyles={{
              display: "flex",
              gap: "11px",
              alignItems: previousPrice ? "flex-end" : "center",
              backgroundColor: "transperent",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 3px 2px 10px",
              position: "absolute",
              right: "16px",
              top: "25px",
              height: "35px",
            }}
          />
        </CardContent>
      </Card>
      <Collapse
        sx={{
          display: { sx: "none", md: "block" },
          position: "absolute",
          right: "20px",
          top: "20px",
          width: "28%",
          backgroundColor: "#bdbdbd",
          borderRadius: 2,
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
        <List
          sx={{
            display: "flex",
            maxWidth: "70%",
            padding: "5px 0",
            marginLeft: "15px",
            bgcolor: "background.paper",
            flexDirection: "row",
            justifyContent: "flex-start",
            columnGap: "15px",
            overflow: "hidden",
            backgroundColor: "#bdbdbd",
            mb: "5px",
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
                  backgroundColor: "transparent",
                  border: "1px solid #000",
                }}
                primary={value.name}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ padding: 0 }}>
          {imageUrls.slice(1, 5).map((item) => (
            <ImageListItem key={item} sx={{ padding: "0 15px 11px" }}>
              <img
                srcSet={item}
                src={item}
                alt={item}
                loading="lazy"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </List>
      </Collapse>
      {/* // </Link> */}
    </Link>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
  hoveredItem: PropTypes.string,
  handleMouseEnter: PropTypes.func.isRequired,
};

const MemoizedProductItem = memo(ProductItem);

MemoizedProductItem.displayName = "ProductItem";

export default MemoizedProductItem;
