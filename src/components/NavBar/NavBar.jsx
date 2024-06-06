import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogs } from "../../redux/catalogs.slice/catalogs.slice";
import { Box } from "@mui/material";
import {
  NavBarWrapper,
  StyledNavBarLink,
} from "../../styles/navbar-footer/NavBarStyled";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
  const dispatch = useDispatch();
  const { catalogs } = useSelector((state) => state.catalogs);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = useSelector((state) => state.login.loggedIn);

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
      <Box sx={{ display: "flex" }}>
        <StyledNavBarLink exact to={`/`} activeClassName="active">
          Home
        </StyledNavBarLink>
        {loggedIn && (
          <StyledNavBarLink to={`/products/library`} activeClassName="active">
            Library
          </StyledNavBarLink>
        )}
        {catalogs.slice(0, 3).map((catalog) => (
          <StyledNavBarLink
            key={catalog.id}
            to={`/products/category/${catalog.name}`}
            activeClassName="active"
          >
            {catalog.name}
          </StyledNavBarLink>
        ))}
      </Box>

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
              <NavLink
                to={`/products/search/?name=${searchQuery}`}
                key={searchQuery}
              >
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
