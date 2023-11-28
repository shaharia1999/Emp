import { configureStore } from '@reduxjs/toolkit'
import DrawarStore from './DrawarStore'

export const store = configureStore({
  reducer: {
    drawar:DrawarStore,
  },
})