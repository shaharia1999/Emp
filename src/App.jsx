
import { Outlet } from 'react-router-dom'
import { createContext} from 'react'; 
import { useState } from 'react';
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
    <myContext.Provider value={context}>
      <Outlet></Outlet>
      </myContext.Provider>
    </>
  )
}

export default App
