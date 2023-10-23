
import { Outlet } from 'react-router-dom'
import { createContext} from 'react'; 
import { useState } from 'react';
export const myContext = createContext(null)
function App() {
  const [user,setUser]=useState(null)
  const context = {
    user,
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
