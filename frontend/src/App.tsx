// import React from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { useState } from "react"

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <div className='h-screen'>
        <Router>
            <AppRoutes isLoggedIn= {isLoggedIn} setLoggedIn = {setLoggedIn}></AppRoutes>
        </Router>
    </div>
  )
}

export default App
