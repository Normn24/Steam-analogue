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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LibraryItem({ product }) {
  const { _id, name, imageUrls } = product;
  const [downloaded, setDownloaded] = useState(null);
  const isDownloaded = JSON.parse(localStorage.getItem("downloaded"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isDownloaded && isDownloaded.some((item) => item === _id)) {
      setDownloaded(true);
    } else {
      setDownloaded(null);
    }
  }, [_id, isDownloaded]);

  const handleDownload = (_id) => {
    if (!downloaded) {
      let oldData = JSON.parse(localStorage.getItem("downloaded"));
      oldData
        ? localStorage.setItem("downloaded", JSON.stringify([...oldData, _id]))
        : localStorage.setItem("downloaded", JSON.stringify([_id]));
      setDownloaded(true);
    }
  };

  const handleDelete = (_id) => {
    if (isDownloaded && isDownloaded.find((item) => item === _id)) {
      const index = isDownloaded.indexOf(_id);
      isDownloaded.splice(index, 1);
      localStorage.setItem("downloaded", JSON.stringify(isDownloaded));
    }
    setAnchorEl(null);
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
            color: "#000",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "#bdbdbd",
            },
          }}
        >
          <HiDotsVertical style={{ width: "20px", height: "20px" }} />
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Link to={`/product/${_id}`}>
            <MenuItem onClick={handleClose}>Store Page</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>Manage</MenuItem>
          {downloaded && (
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
            padding: "20px",
            display: "flex",
            backgroundColor: "transparent",
            flexDirection: "column",
            "&:hover": {
              opacity: 0.9,
              backgroundColor: "#bdbdbd",
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
              {downloaded ? (
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
                {downloaded ? "Play" : "Download"}
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
