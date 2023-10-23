
import { Outlet } from 'react-router-dom'
import { createContext} from 'react'; 
export const myContext = createContext(null)
function App() {
  const [user,setUser]


  const context = {

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
