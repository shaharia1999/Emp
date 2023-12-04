import { configureStore } from '@reduxjs/toolkit'
import DrawarStore from './DrawarStore'
import Invoice from './Invoice'

export const store = configureStore({
  reducer: {
    drawar:DrawarStore,
    Payment:Invoice,
  },
})