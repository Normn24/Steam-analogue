import { Box, Typography, Button } from "@mui/material";

const PriceBox = ({
  previousPrice,
  currentPrice,
  onCart,
  handleCartList,
  productId,
  loggedIn,
  showButton = true,
  sliderItem = false,
  categoryItem = false,
  additionalStyles = {},
  position = "relative",
  alignItems = "center",
  display = "flex",
  justifyContent = "space-between",
  buttonWidth = "105px",
  buttonPadding = "5px 12px",
  currentPriceStylesFontSizeXs = { xs: "16px", md: "16px" },
  previousPriceFontSizeMd = { xs: "12px", md: "12px" },
  discountFontSize = { xs: "24px", md: "24px" },
}) => {
  const percent = previousPrice
    ? Math.floor((currentPrice * 100) / previousPrice - 100)
    : null;

  const discountStyles = {
    fontSize: discountFontSize,
    lineHeight: "1",
    backgroundColor: "#4c6b22",
    padding: categoryItem
      ? { xs: "6.25px 3px" }
      : sliderItem
      ? "4px"
      : "8.25px 3px",
    color: "#BDED11",
    position: sliderItem ? "none" : "absolute",
    top: "0px",
    left: !categoryItem && {
      xs: position === "relative" && "-51%",
      md: position === "relative" ? "-39%" : "unset",
    },
    right: position !== "relative" ? "96%" : "unset",
    borderRadius: "4px 0 0 4px",
  };

  const previousPriceStyles = {
    position: "absolute",
    left: showButton && "14px",
    right: "5px",
    fontSize: previousPriceFontSizeMd,
    bottom: categoryItem ? { xs: "12px", md: "18px" } : "18px",
    color: "#647984",
    textDecorationLine: "line-through",
  };

  const currentPriceStyles = {
    color: "#4c6b22",
    fontSize: currentPriceStylesFontSizeXs,
  };

  const buttonStyles = {
    width: { xs: "auto", md: buttonWidth },
    padding: { xs: "5px 0", md: buttonPadding },
    textTransform: "initial",
    backgroundColor: "#bdbdbd",
    borderRadius: "3px",
  };

  return (
    <Box
      sx={{
        display,
        alignItems: previousPrice ? "flex-end" : alignItems,
        backgroundColor: "#cccc",
        justifyContent,
        padding: "3px 3px 3px 10px",
        borderRadius: "3px",
        gap: "7px",
        position,
        ...additionalStyles,
      }}
    >
      {previousPrice ? (
        <>
          <Typography sx={discountStyles} variant="p" component="p">
            {percent}%
          </Typography>
          <Typography sx={previousPriceStyles} variant="p" component="p">
            {previousPrice}$
          </Typography>
          <Typography sx={currentPriceStyles} variant="p" component="p">
            {currentPrice}$
          </Typography>
        </>
      ) : (
        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: categoryItem && { xs: "10px", md: "16px" },
            margin: categoryItem && { xs: "4px 10px 0 0 ", md: "0" },
            padding: { xs: "0 0 0 5px ", md: 0 },
          }}
        >
          {currentPrice}$
        </Typography>
      )}
      {showButton && (
        <Button
          disabled={!loggedIn}
          onClick={() => handleCartList(productId)}
          sx={buttonStyles}
        >
          {onCart ? "In cart" : "Add to cart"}
        </Button>
      )}
    </Box>
  );
};

export default PriceBox;
