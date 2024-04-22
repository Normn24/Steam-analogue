import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: {name: 'DARK SOULS REMASTERED', year: '24-05-2018', developer: 'QLOC', publisher: 'Bandai Namco Entertainment , From Softwate inc', rating: 84, genres: 'Соулс-лайк, Темне фентезі, Рольова гра, RPG', imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570940/header.jpg?t=1700659167', price: 799, description: "Потім була пожежа. Знову відчуйте визнану критиками гру, що визначає жанр, з якої все почалося. Прекрасно оновлений, поверніться до Lordran у приголомшливій високій чіткості деталей зі швидкістю 60 кадрів в секунду. Dark Souls Remastered включає основну гру та DLC Artorias of the Abyss. Ключові особливості: • Глибокий і Темний Всесвіт • Кожен кінець — це новий початок • Багатство та можливості ігрового процесу • Почуття навчання, майстерності та досягнення • Шлях багатокористувацької гри (до 6 гравців із виділеними серверами)"},
  error: null,
  status: null
}

export const fetchProductId = createAsyncThunk('products/fetchProducts', async () => {
  const data = await fetch(`http://localhost:4000/api/products/${id}`,)
    .then((res) => res.json())
  return data;
});

const productItemSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      });
  },
});


export default productItemSlice.reducer;