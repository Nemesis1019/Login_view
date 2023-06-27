import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { form } from "./pages/form"
import { login } from "./pages/login"
import { table } from "./pages/table"

import {update} from "./pages/update"
import { Toaster} from "react-hot-toast"


function App() {
  return(
    <BrowserRouter >
      
      <Routes>
        <Route path='/' element={<Navigate to ='/login'/>} />
        <Route path='/login' Component={login}/> 
        <Route path='/form' Component={form}/>
        <Route path='/table' Component={table}/>
        <Route path='/update/:identification' Component={update} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )

}

export default App
