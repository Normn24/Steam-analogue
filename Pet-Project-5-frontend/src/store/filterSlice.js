// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/products');
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const { data } = await response.json();
//       console.log('fetched products', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error; // Re-throw the error to be handled by the reject action
//     }
//   }
// );

// const filterSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     // filteredProducts: [],
//     genres: [],
//     loading: false,
//     error: null
//   },
//   reducers: {
//     applyFilters(state, action) {
//       const { searchTerm, searchType } = action.payload;

//       if (!searchTerm) {
//         state.filteredProducts = [];
//         return;
//       }

//       state.filteredProducts = state.products.filter(product => {
//         switch (searchType) {
//           case 'Name':
//             return product.name.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'Categories':
//             return product.categories.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'Publisher':
//             return product.publisher.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'Developer':
//             return product.developer.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'Year':
//             return product.yearOfPublication.includes(searchTerm);
//           case 'Genres':
//             return product.genres.some(genre =>
//               genre.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//           default:
//             return true;
//         }
//       });
//       console.log('Filtered products:', state.filteredProducts);
//     },
//     filterByGenre(state, { payload }) {
//       const genre = payload;

//       state.filteredProducts = state.products.filter(product =>
//         product.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
//       );

//       console.log('Filtered products:', state.filteredProducts);
//     }, 
//     // getGenres(state, {payload}) {
//     //   const allGenres = payload;

//     //   state.genres = state.products.genres

//     //   console.log('all fetched genres', allGenres);
//     // }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//         state.filteredProducts = action.payload; // Initialize filtered products with all products??

//         const genresSet = new Set();
//         action.payload.forEach(product => {
//           product.genres.forEach(genre => {
//             genresSet.add(genre.toLowerCase());
//           });
//         });
//         state.genres = Array.from(genresSet);
//         console.log('Fetched genres:', state.genres);
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   }
// });

// export const { applyFilters, filterByGenre } = filterSlice.actions;

// export default filterSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const { data } = await response.json();
      console.log('fetched products', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

const filterSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    genres: [],
    loading: false,
    error: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;

        const genresSet = new Set();
        action.payload.forEach(product => {
          product.genres.forEach(genre => {
            genresSet.add(genre.toLowerCase());
          });
        });
        state.genres = Array.from(genresSet);
        console.log('Fetched genres:', state.genres);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { applyFilters } = filterSlice.actions;

export default filterSlice.reducer;
