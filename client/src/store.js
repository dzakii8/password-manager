import { configureStore } from '@reduxjs/toolkit'
import fetchSlice from './features/fetch/fetchSlice'

export const store = configureStore({
  reducer: {
    dataPassword: fetchSlice
  },
})

