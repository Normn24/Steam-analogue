import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdDownload, IoIosPlay } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDownloaded,
  removeDownloaded,
} from "../../redux/downloaded.slice/downloaded.slice";

export default function LibraryItem({ product }) {
  const dispatch = useDispatch();
  const { _id, name, imageUrls } = product;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const downloaded = useSelector((state) => state.downloaded.downloaded);
  const isDownloaded = downloaded?.some((item) => item === _id);

  const handleDownload = (_id) => {
    if (!isDownloaded) {
      dispatch(addDownloaded(_id));
    }
  };

  const handleDelete = (_id) => {
    if (isDownloaded) {
      dispatch(removeDownloaded(_id));
      setAnchorEl(null);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          onClick={handleClick}
          variant="text"
          sx={{
            position: "absolute",
            bottom: "14.5%",
            right: "20px",
            cursorPointer: "none",
            zIndex: 10,
            minWidth: "auto",
            width: "30px",
            p: "4px 6px",
            borderRadius: "6px",
            color: "var(--text-color)",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "var(--header-background-color)",
            },
          }}
        >
          <HiDotsVertical style={{ width: "20px", height: "20px" }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "var(--header-background-color)",
            },
            "& .MuiMenuItem-root": {
              color: "var(--text-color)",
            }
          }}
        >
          <Link to={`/product/${_id}`}>
            <MenuItem onClick={handleClose}>Store Page</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>
            Manage
          </MenuItem>
          {isDownloaded && (
            <MenuItem onClick={() => handleDelete(_id)}>Uninstall</MenuItem>
          )}
        </Menu>
        <Card
          onClick={() => handleDownload(_id)}
          sx={{
            width: "280px",
            height: "420px",
            borderRadius: 2,
            boxShadow: "none",
            padding: "15px",
            display: "flex",
            backgroundColor: "transparent",
            flexDirection: "column",
            color: "var(--text-color)",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "var(--header-background-color)",
            },
          }}
        >
          <CardMedia
            sx={{
              height: "340px",
              width: "100%",
              borderRadius: "6px",
            }}
            image={imageUrls[0]}
            title={name}
          />
          <CardContent
            sx={{
              width: "100%",
              padding: "0",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:last-child": { pb: 0 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  width: "80%",
                  m: "8px 0",
                  textTransform: "capitalize",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
                variant="h5"
                component="h5"
              >
                {name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "5px" }}>
              {isDownloaded ? (
                <IoIosPlay style={{ width: "18px", height: "18px" }} />
              ) : (
                <IoMdDownload style={{ width: "18px", height: "18px" }} />
              )}
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  lineHeight: 1,
                }}
                variant="p"
                component="p"
              >
                {isDownloaded ? "Play" : "Download"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

LibraryItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    yearOfPublication: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    currentPrice: PropTypes.number.isRequired,
  }).isRequired,
};
