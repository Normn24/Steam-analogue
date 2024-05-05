import { NavBarItem, NavBarWrapper, StyledNavBarLink } from "./NavBarStyled";
import { fetchCatalogs } from "../../redux/catalogs.slice/catalogs.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
  const dispatch = useDispatch();

  const { catalogs, status, error } = useSelector((state) => state.catalogs);

  //   const [filterLinks, setFilterLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // onSearch(searchQuery);
  };

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (Array.isArray(links)) {
  //       const filtered = links.filter(
  //         (link) => link.title && link.title.includes("NAVBAR")
  //       );
  //       setFilterLinks(filtered);
  //     }
  //   }, [links]);

  //   useEffect(() => {
  //     if (filterLinks.length > 0) {
  //       setLinkToNav(filterLinks[0]?.links[0]?.url || "");
  //     }
  //   }, [filterLinks]);

  return (
    <NavBarWrapper>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        catalogs.slice(0, 4).map((catalog) => (
          <NavBarItem key={catalog.id}>
            <StyledNavBarLink to={`/products/category=${catalog.name}`}>
              {catalog.name}
            </StyledNavBarLink>
          </NavBarItem>
        ))}
      <form onSubmit={handleSearchSubmit} style={{ margin: "0 auto" }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </NavBarWrapper>
  );
}
