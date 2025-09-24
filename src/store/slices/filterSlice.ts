// src/store/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types';
import { mockProducts } from '../../graphql/mockData';

const maxPrice = Math.max(...mockProducts.map(p => p.price));

const initialState: FilterState = {
  category: '',
  priceRange: [0, maxPrice],
  minRating: 0,
  sortBy: 'name',
  sortOrder: 'asc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'price' | 'rating'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.category = '';
      state.priceRange = [0, maxPrice];
      state.minRating = 0;
      state.sortBy = 'name';
      state.sortOrder = 'asc';
    },
  },
});

export const { 
  setCategory, 
  setPriceRange, 
  setMinRating, 
  setSortBy, 
  setSortOrder, 
  resetFilters 
} = filterSlice.actions;