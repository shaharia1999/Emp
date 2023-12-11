import { configureStore } from '@reduxjs/toolkit'
import DrawarStore from './DrawarStore'
import Invoice from './Invoice'
import Selary from './Selary'


export const store = configureStore({
  reducer: {
    drawar:DrawarStore,
    Payment:Invoice,
    Selary:Selary,
  },
})