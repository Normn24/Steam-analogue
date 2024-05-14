import { NavBarItem, NavBarWrapper, StyledNavBarLink } from "./NavBarStyled";
import { fetchCatalogs } from "../../redux/catalogs.slice/catalogs.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch();
  const { catalogs, status, error } = useSelector((state) => state.catalogs);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = localStorage.getItem("loggedIn");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  return (
    <NavBarWrapper>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <Box sx={{ display: "flex" }}>
          <NavBarItem>
            <StyledNavBarLink to={`/`}>Home</StyledNavBarLink>
          </NavBarItem>
          {loggedIn === "true" && (
            <NavBarItem>
              <StyledNavBarLink to={`/products/library`}>
                Library
              </StyledNavBarLink>
            </NavBarItem>
          )}
          {catalogs.slice(0, 3).map((catalog) => (
            <NavBarItem key={catalog.id}>
              <StyledNavBarLink to={`/products/category=${catalog.name}`}>
                {catalog.name}
              </StyledNavBarLink>
            </NavBarItem>
          ))}
        </Box>
      )}
      <form onSubmit={handleSearchSubmit}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{ margin: "8px" }}
          InputProps={{
            style: { paddingRight: "4px" },
            endAdornment: (
              <NavLink to={`/products/search/${searchQuery}`}>
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </NavLink>
            ),
          }}
        />
      </form>
    </NavBarWrapper>
  );
}
