import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/carts.slice/carts.slice";

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
  Button,
} from "@mui/material";

export default function ProductItem({
  product,
  hoveredItem,
  handleMouseEnter,
}) {
  const { _id, name, imageUrls, genres, currentPrice } = product;
  const dispatch = useDispatch()


  return (
    <>
    {/* // <Link className="post__more" to={`/products/${_id}`}> */}
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
                key={value}
                disableGutters
              >
                <ListItemText
                  sx={{
                    margin: "0",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  primary={value}
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
          <Button onClick={(e) =>{
            // e.stopPropagation()
            dispatch(addToCart(_id))
          } } variant="contained">Add to Basket</Button>
         
        </CardContent>
      </Card>
      <Collapse
        sx={{
          position: "absolute",
          right: "20px",
          top: "20px",
          width: "28%",
          backgroundColor: "#bdbdbd",
          marginTop: "10px",
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
          }}
        >
          {genres.map((value) => (
            <ListItem
              sx={{
                width: "auto",
                padding: "0",
                textTransform: "capitalize",
              }}
              key={value}
              disableGutters
            >
              <ListItemText
                sx={{
                  margin: "0",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                primary={value}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ padding: 0 }}>
          {imageUrls.slice(1, 5).map((item) => (
            <ImageListItem key={item} sx={{ padding: "0 15px 15px" }}>
              <img
                srcSet={item}
                src={item}
                alt={item}
                loading="lazy"
                style={{ width: "100%", height: "170px", objectFit: "cover" }}
              />
            </ImageListItem>
          ))}
        </List>
      </Collapse>
    {/* // </Link> */}
    </>
  );
}

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
