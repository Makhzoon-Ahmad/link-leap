  import { Routes, Route } from "react-router-dom"
  import UserSign from "./components/UserSign"
  import Home from "./components/Home"
import UserLinks from "./components/UserLinks"
import ShortLinkPage from "./pages/ShortLink"
import AnalyticsDashboard from "./pages/Insights"

  export interface UserLogInProps{
    
      isLoggedIn: boolean,
      setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    
  }

  const AppRoutes = ({isLoggedIn , setLoggedIn}: UserLogInProps) => {
    return (
      <Routes>
          <Route path="/" element={<Home isLoggedIn= {isLoggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path="/:shortId" element={<ShortLinkPage/>}></Route>
          <Route path="insights" element={<AnalyticsDashboard />}  />          
          <Route path="/sign" element={<UserSign isLoggedIn= {isLoggedIn} setLoggedIn = {setLoggedIn}/>}></Route>
          <Route path="/links" element={<UserLinks/>}></Route>
      </Routes>
    )
  }

  export default AppRoutes
