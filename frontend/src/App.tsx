// import React from 'react'

import LinkProvider from "./components/LinkProvider"
import LinkShortener from "./components/LinkShortener"


const App = () => {
  return (
    <div className='h-screen'>
        <LinkProvider>
            <LinkShortener/>
        </LinkProvider>
    </div>
  )
}

export default App
