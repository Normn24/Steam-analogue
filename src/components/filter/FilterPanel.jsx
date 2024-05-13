import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from 'formik';
import Slider from '@mui/material/Slider';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button, 
    Divider, 
    Typography
} from '@mui/material';
import { fetchGenres } from "../../redux/genres.slice/genres.slice";
import { fetchProducts } from "../../redux/products.slice/products.slice"
import { fetchProductsByGenre } from "../../redux/productsByGenre/productsByGenre.slice";

function FilterPanel() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    //далі працюю з formik values замість 100500 стейтів 
    //головне питання - як всереднині формік заюзать його initialValues для фільтрації всіх відразу щоб вивести filteredProducts 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenres());
        dispatch(fetchProducts());
    }, [dispatch]);
    
    const genres = useSelector((state) => state.genres.genres);
    const products = useSelector((state) => state.products.products.data);

    // handlers for filters by genreId, priceRange, yearRange, gameName, sortingOrder :

    const handleGenreFetch = (genreId) => {
        dispatch(fetchProductsByGenre(genreId));
    }

    const handlePriceRangeFilter = (priceRange) => {
        const filtered = products.filter(product =>
            product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1]
        );
        console.log("productsFilteredByPriceRange", filtered);
    };
    
    const handleYearRangeFilter = (yearRange) => {
        const filtered = products.filter(product => {
            const year = new Date(product.yearOfPublication).getFullYear();
            return year >= yearRange[0] && year <= yearRange[1];
        });
        console.log("productsFilteredByYearRange", filtered);
    };

    const handleSearch = (gameName) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(gameName.toLowerCase())
        );
        console.log("productsFilteredByName", filtered);
    };

    const handleSort = (sortingOrder) => {
        let sortedProducts = [...products]; //сюда filteredProducts після фільтрування а не products
        if (sortingOrder === 'atoz') sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortingOrder === 'ztoa') sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        setFilteredProducts(sortedProducts);

        console.log('sortedProducts', sortedProducts);
    };

    return (
        <div style={{ width: '400px', margin: '20px' }}>
            <h4>Filters</h4>

            <Divider style={{marginBottom: '20px'}}/>

            <Formik
                initialValues={{
                    genreId: '',
                    priceRange: [100, 500], 
                    yearRange: [2010, 2024],
                    name: '',
                    sortBy: ''
                }}
                // onSubmit={(values, actions) => {
                //     // Handle form submission here
                // }}
            >
                {({ values, setFieldValue, setValues }) => (
                    <Form>
                        <FormControl fullWidth >
                            <TextField
                                select
                                id="genreId"
                                name="genreId"
                                label="Genre"
                                value={values.genreId}
                                onChange={(event) => {
                                    const selectedGenreId = event.target.value;
                                    setFieldValue('genreId', selectedGenreId);
                                    handleGenreFetch(selectedGenreId);
                                }}
                                variant="outlined"
                            >
                                {/* <MenuItem value="">Select a genre</MenuItem> */}
                                {genres.map(genre => (
                                    <MenuItem key={genre._id} value={genre._id}>{genre.name.toUpperCase()}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>

                        <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>

                        <Typography variant="subtitle1" gutterBottom>
                            Price Range
                        </Typography>

                        <FormControl fullWidth>
                            <Slider
                                value={values.priceRange}
                                onChange={(event, newValue) => {
                                    // console.log("Price Range:", newValue);
                                    setFieldValue('priceRange', newValue);
                                    handlePriceRangeFilter(newValue);
                                }}
                                valueLabelDisplay="auto"
                                min={100}
                                max={500}
                            />
                        </FormControl>

                        <Typography variant="subtitle2" gutterBottom>$ {values.priceRange[0]}</Typography>
                        <Typography variant="subtitle2" gutterBottom>$ {values.priceRange[1]}</Typography>

                        <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>

                        <Typography variant="subtitle1" gutterBottom>Year Range</Typography>

                        <FormControl fullWidth>
                            <Slider
                                value={values.yearRange}
                                onChange={(event, newValue) => {
                                    // console.log("Year Range:", newValue);
                                    setFieldValue('yearRange', newValue);
                                    handleYearRangeFilter(newValue);
                                }}
                                valueLabelDisplay="auto"
                                min={2010}
                                max={2024}
                            />
                        </FormControl>

                        <Typography variant="subtitle2" gutterBottom>Year {values.yearRange[0]}</Typography>
                        <Typography variant="subtitle2" gutterBottom>Year {values.yearRange[1]}</Typography>

                        <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>

                        <FormControl fullWidth>
                            <TextField
                                id="name"
                                name="name"
                                label="Game Name"
                                value={values.name}
                                onChange={(event) => {
                                    const gameName = event.target.value;
                                    setFieldValue('name', gameName);
                                    handleSearch(gameName);
                                }}
                                variant="outlined"
                            />
                        </FormControl>

                        <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>

                        <FormControl fullWidth >
                            <TextField
                                select
                                id="sortBy"
                                name="sortBy"
                                label="Sort in Order"
                                value={values.sortBy}
                                onChange={(event) => {
                                    const sortingOrder = event.target.value;
                                    handleSort(sortingOrder);
                                    setFieldValue('sortBy', sortingOrder);
                                }}
                                variant="outlined"
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="atoz">A to Z</MenuItem>
                                <MenuItem value="ztoa">Z to A</MenuItem>
                            </TextField>
                        </FormControl>

                        <Divider style={{marginBottom: '20px', marginTop: '20px'}}/>

                        <FormControl fullWidth>
                            <Button
                                type="button"
                                onClick={() => {
                                    setValues({
                                        genreId: '',
                                        priceRange: [100, 500], 
                                        yearRange: [2010, 2024],
                                        name: '',
                                        sortBy: ''
                                    });
                                }}
                                variant="contained"
                            >
                                Clear Filters
                            </Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FilterPanel;

//старий варіант з юзСтейтами

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import {
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Button,
//     Slider,
//     Typography,
//     Divider
// } from '@mui/material';
// import { fetchGenres } from "../../redux/genres.slice/genres.slice";
// import { fetchProducts } from "../../redux/products.slice/products.slice"
// import { fetchProductsByGenre } from "../../redux/productsByGenre/productsByGenre.slice";

// function FilterPanel() {
//     const [genreId, setGenreId] = useState("");
//     const [priceRange, setPriceRange] = useState([100, 500]);
//     const [yearRange, setYearRange] = useState([2010, 2024]);
//     const [gameName, setGameName] = useState('');
//     const [sortCriteria, setSortCriteria] = useState(null);
//     const [sortDirection, setSortDirection] = useState('');

//     console.log('sortCriteria', sortCriteria);

//     const [filteredProductsByName, setFilteredProductsByName] = useState([]);
//     const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([]);
//     const [filteredProductsByYear, setFilteredProductsByYear] = useState([]);

//     const dispatch = useDispatch();
    
//     const handleGenreFetch = (genrepk) => {
//         dispatch(fetchProductsByGenre(genrepk))
//         setGenreId(genrepk)
//     }
    
//     useEffect(() => {
//         dispatch(fetchGenres());
//         dispatch(fetchProducts());
//     }, [dispatch]);
    
//     const genres = useSelector((state) => state.genres.genres);
//     const products = useSelector((state) => state.products.products.data);
//     const filteredProductsByGenre = useSelector((state) => state.productsByGenre.productsFilteredByGenre);
    
//     console.log('filteredProductsByGenre', filteredProductsByGenre);
//     console.log('products', products);


//     useEffect(() => {
//         if (gameName.trim() !== '') {
//             const filtered = products.filter(product =>
//                 product.name.toLowerCase().includes(gameName.toLowerCase())
//             );
//             setFilteredProductsByName(filtered);
//         } else {
//             setFilteredProductsByName([]);
//         }
//     }, [gameName, products]);
      
//     useEffect(() => {
//         if (products) {
//             const filtered = products.filter(product =>
//                 product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1]
//             );
//             setFilteredProductsByPrice(filtered);
//         }
//     }, [priceRange, products]);

//     useEffect(() => {
//         if (products) {
//             const filtered = products.filter(product => {
//                 const publicationYear = new Date(product.yearOfPublication).getFullYear();
//                 return publicationYear >= yearRange[0] && publicationYear <= yearRange[1];
//             });
//             setFilteredProductsByYear(filtered);
//         }
//     }, [yearRange, products]);

//     //------------------------sorting

//     const sortByName = (arr) => {
//         return arr.slice().sort((a, b) => {
//             const nameA = a.name.toLowerCase();
//             const nameB = b.name.toLowerCase();
//             if (sortDirection === 'asc') {
//                 return nameA.localeCompare(nameB);
//             } else {
//                 return nameB.localeCompare(nameA);
//             }
//         });
//     };

//     // const sortByPrice = (arr) => {
//     //     return arr.slice().sort((a, b) => a.currentPrice - b.currentPrice);
//     // };

//     // const sortByYear = (arr) => {
//     //     return arr.slice().sort((a, b) => new Date(a.yearOfPublication) - new Date(b.yearOfPublication));
//     // };

//     const handleSort = (criteria, direction) => {
//         setSortCriteria(criteria);
//         setSortDirection(direction);
//     };

//     let sortedProducts = [];
//     switch (sortCriteria) {
//         case 'name':
//             sortedProducts = sortByName(products);
//             break;
//         // case 'price':
//         //     sortedProducts = sortByPrice(products);
//         //     break;
//         // case 'year':
//         //     sortedProducts = sortByYear(products);
//         //     break;
//         default:
//             sortedProducts = products;
//             break;
//     }

//     // console.log('sortedProducts', sortedProducts);

//     return (
//         <div style={{ width: '300px', padding: '20px', borderRight: '1px solid #ccc' }}>
//             <h4>Filters</h4>
//             <Divider />

//             <div id='genre-select'>
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Genre</InputLabel>
//                     <Select
//                         value={genreId}
//                         onChange={(e) => handleGenreFetch(e.target.value)}
//                     >
//                         {genres.map((genre) => (
//                             <MenuItem key={genre._id} value={genre._id}>
//                                 {genre.name.toUpperCase()}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             </div>

//             <Divider />

//             <div id='price-range' style={{ marginTop: '20px' }}>
//                 <Typography id="price-slider" gutterBottom>Price Range</Typography>
//                 <Slider
//                     value={priceRange}
//                     onChange={(e, newValue) => setPriceRange(newValue)}
//                     min={100}
//                     max={500}
//                     valueLabelDisplay="auto"
//                     aria-labelledby="range-slider"
//                 />
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography gutterBottom>{priceRange[0]}</Typography>
//                     <Typography gutterBottom>{priceRange[1]}</Typography>
//                 </div>
//             </div>

//             <Divider />

//             <div id='year-range' style={{ marginTop: '20px' }}>
//                 <Typography id="year-slider" gutterBottom>Year</Typography>
//                 <Slider
//                     value={yearRange}
//                     onChange={(e, newValue) => setYearRange(newValue)}
//                     min={2010}
//                     max={2024}
//                     valueLabelDisplay="auto"
//                     aria-labelledby="range-slider"
//                 />
//                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography gutterBottom>{yearRange[0]}</Typography>
//                     <Typography gutterBottom>{yearRange[1]}</Typography>
//                 </div>
//             </div>

//             <Divider />

//             <div id='game-name'>
//                 <TextField
//                     label="Game Name"
//                     value={gameName}
//                     onChange={(e) => setGameName(e.target.value)}
//                     fullWidth
//                     margin="normal"
//                 />
//             </div>

//             <Divider />

//             <div style={{ marginTop: '20px' }}>
//                 <FormControl fullWidth margin="normal">
//                     <InputLabel>Sort By</InputLabel>
//                     <Select
//                         value={sortDirection}
//                         onChange={(e) => handleSort('name', e.target.value)}
//                     >
//                         <MenuItem value="asc">A to Z</MenuItem>
//                         <MenuItem value="desc">Z to A</MenuItem>
//                     </Select>
//                 </FormControl>
//             </div>

//             <Divider />
//         </div>
//     );
// };

// export default FilterPanel;
