import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStyles } from "../../../styles";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function SliderCardItem({ product }) {
  const { _id, name, imageUrls, genres, currentPrice } = product;
  const classes = useStyles();

  return (
    <Card
      sx={{
        width: 380,
        boxShadow: 10,
        borderRadius: 2,
        margin: "20px 20px",
      }}
    >
      <Link className="post__more" to={`/product/${_id}`}>
        <CardMedia sx={{ height: 280 }} image={imageUrls[0]} title={name} />
        <CardContent
          sx={{
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
              width: "100%",
              maxWidth: "70%",
              bgcolor: "background.paper",
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              columnGap: "15px",
            }}
          >
            {genres.slice(0, 3).map((value) => (
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
      </Link>
    </Card>
  );
}

SliderCardItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};
