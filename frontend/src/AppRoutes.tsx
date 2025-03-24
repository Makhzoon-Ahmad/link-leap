import { Routes, Route } from "react-router-dom"
import UserSign from "./components/UserSign"
import Home from "./components/Home"


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:shortlink" element={<Home/>}></Route>
        
        <Route path="/sign" element={<UserSign/>}></Route>
    </Routes>
  )
}

export default AppRoutes
