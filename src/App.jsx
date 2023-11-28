
import { Outlet } from 'react-router-dom'
import { createContext} from 'react'; 
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
export const myContext = createContext(null)
function App() {
  const [user,setUser]=useState(localStorage.getItem('id')?localStorage.getItem('id'):null)
  const [type,setType]=useState(false)
  const context = {
    user,
    type,
    setType
  }
  return (
    <>
    <Provider store={store}>
    <myContext.Provider value={context}>
      <Outlet></Outlet>
      </myContext.Provider>
      </Provider>
    </>
  )
}

export default App
