// import React from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"

const App = () => {
  return (
    <div className='h-screen'>
        <Router>
            <AppRoutes></AppRoutes>
        </Router>
    </div>
  )
}

export default App
