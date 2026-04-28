import { createSlice } from '@reduxjs/toolkit';
import catalogData from '../data/data.json';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: catalogData,
    selectedItem: null,
    activeCategory: 'All',
    searchQuery: '',
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setSelectedItem,
  clearSelectedItem,
  setActiveCategory,
  setSearchQuery,
} = catalogSlice.actions;

export const selectAllItems = (state) => state.catalog.items;
export const selectSelectedItem = (state) => state.catalog.selectedItem;
export const selectActiveCategory = (state) => state.catalog.activeCategory;
export const selectSearchQuery = (state) => state.catalog.searchQuery;

export const selectCategories = (state) => {
  const cats = [...new Set(state.catalog.items.map((i) => i.category))];
  return ['All', ...cats];
};

export const selectFilteredItems = (state) => {
  const { items, activeCategory, searchQuery } = state.catalog;
  return items.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.itemname.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
};

export const selectItemsByCategory = (state) => {
  const filtered = selectFilteredItems(state);
  return filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

export default catalogSlice.reducer;
