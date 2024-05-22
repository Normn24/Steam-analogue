import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoClock } from "react-icons/go";
import {
  CardMedia,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
export default function UserOrders() {
  const { orders } = useSelector((state) => state.orders);
  orders.map((item) => console.log(item));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: "700", marginBottom: "15px" }}
        >
          My orders
        </Typography>
        {orders.map((item) => (
          <Accordion
            key={item._id}
            sx={{
              boxShadow: 5,
              borderRadius: 2,
              marginBottom: "25px",
              padding: "10px",
              backgroundColor: "transparent",
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel-content"
              id="panel-header"
              expandIcon={
                <IoIosArrowDown style={{ width: "30px", height: "30px" }} />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <Typography variant="p" component="p">
                  #{item.orderNo}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <GoClock
                    style={{
                      marginRight: "5px",
                      height: "20px",
                      width: "20px",
                    }}
                  />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ minWidth: "100px", textAlign: "right" }}
                >
                  ${item.totalSum}
                </Typography>
              </Box>
            </AccordionSummary>
            {item.products.map((el) => (
              <AccordionDetails
                key={el.product._id}
                sx={{
                  display: "flex",
                  borderBottom: "1px solid #cccc",
                  p: "15px",
                }}
              >
                <CardMedia
                  sx={{
                    height: "100px",
                    width: "300px",
                    objectFit: "cover",
                    borderRadius: "6px 0px 0px 6px",
                  }}
                  image={el.product.imageUrls[0]}
                  title={el.product._id}
                />
                <CardContent
                  sx={{
                    width: "100%",
                    minHeight: 83,
                    padding: "0px 0px 0px 16px ",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    "&:last-child": { pb: 0 },
                  }}
                >
                  <Box>
                    <Link
                      className="post__more"
                      to={`/product/${el.product._id}`}
                    >
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        variant="h5"
                        component="h5"
                      >
                        {el.product.name}
                      </Typography>
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        variant="p"
                        component="p"
                      >
                        Publisher: {el.product.publisher}
                      </Typography>
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        variant="p"
                        component="p"
                      >
                        Developer: {el.product.developer}
                      </Typography>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      width: "120px",
                    }}
                  >
                    {el.product.previousPrice ? (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "11px",
                          alignItems: "baseline",
                          position: "relative",
                          paddingRight: "4px",
                          backgroundColor: "#cccc",
                          width: "fit-content",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "24px",
                            lineHeight: "1",
                            backgroundColor: "#4c6b22",
                            padding: "6px 3px 3px",
                            color: "#BDED11",
                            borderRadius: "4px 0 0 4px",
                          }}
                          variant="p"
                          component="p"
                        >
                          -
                          {el.product.previousPrice
                            ? Math.floor(
                                (el.product.currentPrice * 100) /
                                  el.product.previousPrice
                              )
                            : null}
                          %
                        </Typography>
                        <Typography
                          sx={{
                            position: "absolute",
                            right: "4.5%",
                            fontSize: "12px",
                            bottom: "16px",
                            color: "#647984",
                            textDecorationLine: "line-through",
                          }}
                          variant="p"
                          component="p"
                        >
                          {el.product.previousPrice}$
                        </Typography>
                        <Typography
                          sx={{
                            color: "#4c6b22",
                          }}
                          variant="p"
                          component="p"
                        >
                          {el.product.currentPrice}$
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "23px",
                          textAlign: "center",
                          backgroundColor: "#cccc",
                          borderRadius: "4px",
                        }}
                        variant="p"
                        component="p"
                      >
                        {el.product.currentPrice}$
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Box>
    </>
  );
}
